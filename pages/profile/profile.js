var app = getApp();
Page({
  data: {
    title: 'V1.0.0',
    profile: null,
  },

  onLoad(options) {
    
    this.setData({
      profile: app.getUserInfo()
    })
  }
})