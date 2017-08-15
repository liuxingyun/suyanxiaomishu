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

    newsList: [],

  },
  contentDetail: function (event) {
    console.log(event.currentTarget.dataset.contentId);
    var contentId = event.currentTarget.dataset.contentId;
    wx.navigateTo({
      url: '../detail/detail?newsId=' + contentId
    })
  },
  onLoad(options) {


    this.setData({
      profile: app.getUserInfo()
    })
    //this.fetchBookList()

    this.fetchNewList();
    this.fetchImageList();

  },

  // 获取 新闻和公告列表 数据
  fetchNewList() {
    let that = this
    let contentGroupID = 100;//新闻和公告分类id

    let objects = {
      contentGroupID
    }

    wx.BaaS.getContentList(objects).then((res) => {

      for (var i = 0; i < res.data.objects.length; i++) {
        res.data.objects[i].publishDate = new Date(res.data.objects[i].created_at*1000).toLocaleString();
      }
      that.setData({
        newsList: res.data.objects
      })
    }, (err) => {
      console.dir(err)
    });
  },


  // 获取首页gallery图片列表
  fetchImageList() {
    let that = this;
    let tableID = 548;
    let objects = {
      tableID,
      order_by: 'created_at'//升序排列
    }

    wx.BaaS.getRecordList(objects).then((res) => {
      var totalLength = res.data.objects.length;
      // var selectedIndex=Math.round(Math.random()*totalLength);
      // console.log(selectedIndex);

      that.setData({
        imgUrls: res.data.objects[totalLength - 1].image_paths
      })
    }, (err) => {
      console.dir(err)
    });
  },





})