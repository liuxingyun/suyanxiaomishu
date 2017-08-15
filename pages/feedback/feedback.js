Page({
  data: {
    categories: [],
    categoryIndex: 0,
    feedbackContent: null,
    tableID: 480//feed_category表ID
  },
  onLoad(options) {
    this.fetchCategoryList()
  },
  //bindCategoryChange
  bindCategoryChange: function (e) {
    console.log('picker category 发生选择改变，携带值为', e.detail.value);

    this.setData({
      categoryIndex: e.detail.value
    })
  },
  //获取反馈分类列表
  fetchCategoryList() {
    let that = this
    let tableID = this.data.tableID
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

  //添加反馈
  submitFeedback(e) {

    let that = this
    let tableID = 481; //反馈表ID
    let selectedCategoryId = this.data.categories[this.data.categoryIndex].id;

    let feedbackContent = e.detail.value.textarea

    let data = {
      categoryId: selectedCategoryId,
      content: feedbackContent
    }
    let objects = {
      tableID,
      data
    }

    // 创建一个数据项
    wx.BaaS.createRecord(objects).then((res) => {

      wx.showToast({
        title: '反馈成功',
        icon: 'success',
        duration: 2000
      });
      e.detail.value.textarea = "";
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/profile/profile'
        });
      }, 2000);

    }, (err) => {
      console.log(err)
    })
  },



})