# wx-mini-mixin

小程序扩展。包含mixin支持，事件勾子支持，从某个小程序页面直接调用其它页面方法完成跨页面通信。

## 小程序mixin使用

```
import createPage from '../../utils/createPage';
import sayHello from '../../mixins/sayHello';
import counter from '../../mixins/counter';
import duplicate from '../../mixins/duplicate';
import lifecycle from '../../mixins/lifecycle';
import lifecycle2 from '../../mixins/lifecycle2';

Page(createPage({
  data: {
    person: 'foo',
  },

  mixins: [sayHello, counter, duplicate, lifecycle, lifecycle2],
  onLoad(opts) {
    console.log('page index loaded!');

    // 使用mixin
    this.sayHello()

    this.increase();

    this.bye('abc', 'see you again');

    this.$invoke('pages/index/index', 'selfInvoke', 'u3xyz', 18)
  },
  selfInvoke(name, age) {
    console.log(`self invoke. ${this.data.foo}. name=${name}, age=${age}`)
  },
  onShow() {
    console.log('page onShow...')
  }
}));
```


## 小程序事件勾子

```
import createPage from '../../utils/createPage';

Page(createPage({
  onBeforeLoad(opts) {
    this.setData({
      'foo': 'foo-onBeforeLoad'
    });
    console.log(`onBeforeLoad. ${this.data.foo}`);
  },

  onLoad(opts) {
    console.log('page index loaded!');

    // 使用mixin
    this.sayHello()

    this.increase();

    this.bye('abc', 'see you again');

    this.$invoke('pages/index/index', 'selfInvoke', 'u3xyz', 18)
  },

  onAfterLoad(opts) {
    this.setData({
      'foo': 'foo-onAfterLoad'
    });

    console.log(`onAfterLoad. ${this.data.foo}`);
  },
});
```

**注意：这里只支持了onLoad的前置，后置勾子。如有需要，可自己增加其它事件勾子**

## 小程序页面方法直接调用

```
this.$invoke('pages/index/index', 'decrease');
```

## 项目启动

此项目克隆后，可以直接在小程序中运行。

## License

MIT