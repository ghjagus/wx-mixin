/**
 * @module page/detail
 */

import createPage from '../../utils/createPage';
import sayHello from '../../mixins/sayHello';
import counter from '../../mixins/counter';
import duplicate from '../../mixins/duplicate';
import lifecycle from '../../mixins/lifecycle';
import lifecycle2 from '../../mixins/lifecycle2';

Page(createPage({
  mixins: [sayHello, counter, duplicate, lifecycle, lifecycle2],

  sayHello() {
    console.log(`page-detail sayHello`);
  },

  invokeIndexPageIncrease() {
    this.$invoke('pages/index/index', 'increase');
  },
  
  invokeIndexPageDecrease() {
    this.$invoke('pages/index/index', 'decrease');
  },

  onLoad() {
    console.log(`page-detail onLoad...`)

    this.sayHello();
  },

  onShow() {
    console.log(`page-detail onShow...`);
  }
}));