var app = getApp();
Page({
  data: {
    categories: []
  },

  onLoad(options) {
    console.log('onLoad');
    var result = app.getUserInfo();

    this.setData({
      profile: app.getUserInfo()
    });
    this.fetchAssistantCategories()
  },
  // 获取助手分类列表数据
  fetchAssistantCategories() {
    let that = this
    let tableID = 563;//助手分类表ID
    let objects = {
      tableID
    }

    wx.BaaS.getRecordList(objects).then((res) => {
      that.setData({
        categories: res.data.objects
      })
    }, (err) => {
      console.dir(err)
    });
  },


})