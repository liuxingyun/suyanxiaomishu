var app = getApp();
Page({
  data: {
    title: '我的书架-v1.0版本',
    profile: null,
  },

  onLoad(options) {
    console.log('onLoad');
    var result=app.getUserInfo();
    debugger;
    this.setData({
      profile: app.getUserInfo()
    })
  }
})