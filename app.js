/**
 * 小程序启动入口文件
 */

import createApp from 'utils/createApp';

App(createApp({

  // 全局内存缓存数据
  $$data: {},

  // 小程序启动事件方法
  onLaunch() {

    {
      // 获取系统信息，platform = ios|android|devtools

      let retry = 10;

      while (retry-- > 0) {
        try {
          this.$$data.sysInfo = wx.getSystemInfoSync();
        } catch (e) {}

        if (this.$$data.sysInfo && this.$$data.sysInfo.windowWidth) {
          break;
        }
      }

    }
  }
}));