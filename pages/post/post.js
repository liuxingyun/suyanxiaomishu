//index.js
//获取应用实例
const wxParser = require('../../wxParser/index');

var app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    duration: 500,

    imgUrls: [],
    profile: null,
    tableID: 373, // 从 https://cloud.minapp.com/dashboard/ 管理后台的数据表中获取
    bookList: null,
    postList: [],
    createBookValue: '',
    inputBook: '',
    editBookName: '',
    inputEditBook: '',
  },
  contentDetail: function (event) {
    console.log(event.currentTarget.dataset.contentId);
    var contentId = event.currentTarget.dataset.contentId;
    wx.navigateTo({
      url: '../detail/detail?newsId=' + contentId
    })
  },
  onLoad(options) {
    console.log("run here.");
    this.setData({
      profile: app.getUserInfo()
    })
    //this.fetchBookList()

    this.fetchPostList();
    this.fetchPostCategories();

  },
  onShow:function(){
    //每次页面展示时都重新获取一遍数据
    this.fetchPostList();
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

  // 获取 postList 数据
  fetchPostList() {
    let that = this
    let tableID = 628;//post TableID
    let params = { tableID }

    wx.BaaS.getRecordList(
      params).then((res) => {
        that.setData({
          postList: res.data.objects,
        })
      }, (err) => {
        // err
      })
  },






  createBook(e) {
    let that = this
    let tableID = this.data.tableID
    let inputBook = this.data.inputBook
    let data = {
      bookName: inputBook,
      isEditing: false
    }
    let objects = {
      tableID,
      data
    }

    // 创建一个数据项
    wx.BaaS.createRecord(objects).then((res) => {
      that.setData({
        createBookValue: '',
      })
      that.fetchBookList()
    }, (err) => {
      console.log(err)
    })
  },



})