/**
 * 小程序页面栈实现
 */

export default class {
  constructor() {
    this.stack = [];
  }

  addPage(scope) {
    this.removePage(scope);

    this.stack.push({
      route: scope.__route__,
      scope
    });
  }

  removePage(scope) {
    this.stack = this.stack.filter(page => page.route !== scope.__route__);
  }

  invoke(pagePath, methodName, ...args) {
    let page = this.stack.filter(page => page.route === pagePath);
    
    if (page.length) {
      let scope = page[0].scope;
      
      scope[methodName](...args);
    } else {
      console.warn(`页面${pagePath}不存在`)
    }
  }
}