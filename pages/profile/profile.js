var app = getApp();
Page({
  data: {
    title: 'V1.0.0',
    profile: null,
  },

  onLoad(options) {
    console.log('onLoad');
    var result=app.getUserInfo();
    
    this.setData({
      profile: app.getUserInfo()
    })
  }
})