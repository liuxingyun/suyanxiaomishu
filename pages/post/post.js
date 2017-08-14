//index.js
//获取应用实例
const wxParser = require('../../wxParser/index');

var app = getApp()

Page({
  data: {

    tableID: 373, // 从 https://cloud.minapp.com/dashboard/ 管理后台的数据表中获取

    postList: [],

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
  selectCategory:function(event){
    debugger;
    console.log(event);
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
  }


})