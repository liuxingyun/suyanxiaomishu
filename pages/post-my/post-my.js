

var app = getApp()

Page({
  data: {
    postList: [],
    postTableId:628
  },

  onLoad(options) {
    this.fetchMyPostList();
  },

  // 获取我的帖子列表数据
  fetchMyPostList() {
    let that = this
    let tableID = 628;//post TableID
    let userId=app.getUserId();
    let objects = { 
      tableID:that.data.postTableId,
      user_id:userId
     }

    wx.BaaS.getRecordList(
      objects).then((res) => {
        that.setData({
          postList: res.data.objects
        })
      }, (err) => {
        console.log(err);
      })
  }

})