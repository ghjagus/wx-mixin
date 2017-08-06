/**
 * @module page/index
 */

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

  selfInvoke(name, age) {
    console.log(`self invoke. ${this.data.foo}. name=${name}, age=${age}`)
  },
  
  onShow() {
    console.log('page onShow...')
  },
  
  openList() {
    wx.navigateTo({
      url: '/pages/list/list'
    })
  },
  
  openDetail() {
    wx.navigateTo({
      url: '/pages/detail/detail'
    })
  }
}));