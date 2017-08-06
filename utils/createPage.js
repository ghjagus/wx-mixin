/**
 * 为每个页面提供mixin，page invoke桥接
 */

const isArray = v => Array.isArray(v);
const isFunction = v => typeof v === 'function';
const noop = function () {};

// 借鉴redux https://github.com/reactjs/redux
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  const last = funcs[funcs.length - 1];
  const rest = funcs.slice(0, -1);
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args));
}


// 页面堆栈
const pagesStack = getApp().$pagesStack;

const PAGE_EVENT = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage'];
const APP_EVENT = ['onLaunch', 'onShow', 'onHide', 'onError'];

const onLoad = function (opts) {
  // 把pageModel放入页面堆栈
  pagesStack.addPage(this);

  this.$invoke = (pagePath, methodName, ...args) => {
    pagesStack.invoke(pagePath, methodName, ...args);
  };

  this.onBeforeLoad(opts);
  this.onNativeLoad(opts);
  this.onAfterLoad(opts);
};

const getMixinData = mixins => {
  let ret = {};

  mixins.forEach(mixin => {
    let { data={} } = mixin;

    Object.keys(data).forEach(key => {
      ret[key] = data[key];
    });
  });

  return ret;
};

const getMixinMethods = mixins => {
  let ret = {};

  mixins.forEach(mixin => {
    let { methods={} } = mixin;

    // 提取methods
    Object.keys(methods).forEach(key => {
      if (isFunction(methods[key])) {
        // mixin中的onLoad方法会被丢弃
        if (key === 'onLoad') return;

        ret[key] = methods[key];
      }
    });

    // 提取lifecycle
    PAGE_EVENT.forEach(key => {
      if (isFunction(mixin[key]) && key !== 'onLoad') {
        if (ret[key]) {
          // 多个mixin有相同lifecycle时，将方法转为数组存储
          ret[key] = ret[key].concat(mixin[key]);
        } else {
          ret[key] = [mixin[key]];
        }
      }
    })
  });

  return ret;
};

/**
 * 重复冲突处理借鉴vue:
 * data, methods会合并，组件自身具有最高优先级，其次mixins中后配置的mixin优先级较高
 * lifecycle不会合并。先顺序执行mixins中的lifecycle，再执行组件自身的lifecycle
 */

const mixData = (minxinData, nativeData) => {
  Object.keys(minxinData).forEach(key => {
    // page中定义的data不会被覆盖    
    if (nativeData[key] === undefined) {
      nativeData[key] = minxinData[key];
    }
  });
  
  return nativeData;
};

const mixMethods = (mixinMethods, pageConf) => {
  Object.keys(mixinMethods).forEach(key => {
    // lifecycle方法
    if (PAGE_EVENT.includes(key)) {
      let methodsList = mixinMethods[key];

      if (isFunction(pageConf[key])) {
        methodsList.push(pageConf[key]);
      }

      pageConf[key] = (function () {
        return function (...args) {
          compose(...methodsList.reverse().map(f => f.bind(this)))(...args);
        };
      })();
    }

    // 普通方法
    else {
      if (pageConf[key] == null) {
        pageConf[key] = mixinMethods[key];
      }
    }
  });

  return pageConf;
};

export default pageConf => {

  let {
    mixins = [],
    onBeforeLoad = noop,
    onAfterLoad = noop
  } = pageConf;

  let onNativeLoad = pageConf.onLoad || noop;
  let nativeData = pageConf.data || {};

  let minxinData = getMixinData(mixins);
  let mixinMethods = getMixinMethods(mixins);

  Object.assign(pageConf, {
    data: mixData(minxinData, nativeData),
    onLoad,
    onBeforeLoad,
    onAfterLoad,
    onNativeLoad,
  });

  pageConf = mixMethods(mixinMethods, pageConf);

  return pageConf;
};