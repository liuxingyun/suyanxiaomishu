

var app = getApp()

Page({
  data: {
    postList: [],
    postTableId: 628,
    categories: []

  },

  onLoad(options) {
    this.fetchPostCategories();
    this.fetchMyPostList();
  },
  // 获取社区分类列表数据
  fetchPostCategories() {
    let that = this
    let tableID = 597;//帖子分类表ID

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
  // 获取我的帖子列表数据
  fetchMyPostList() {
    let that = this
    let tableID = 628;//post TableID
    let userId = app.getUserId();
    let objects = {
      tableID: that.data.postTableId,
      user_id: userId
    }

    wx.BaaS.getRecordList(
      objects).then((res) => {

        for (var i = 0; i < res.data.objects.length; i++) {
          res.data.objects[i].publishDate = new Date(res.data.objects[i].created_at * 1000).toLocaleString();
          //根据分类
          var categoryId = res.data.objects[i].category_id;
          for (var j = 0; j < that.data.categories.length; j++) {
            if (that.data.categories[j].id == categoryId) {
              res.data.objects[i].categoryImagePath = that.data.categories[j].icon_path_highlight;
            }
          }
        }

        that.setData({
          postList: res.data.objects
        })
      }, (err) => {
        console.log(err);
      })
  }

})