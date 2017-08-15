//index.js
//获取应用实例
const wxParser = require('../../wxParser/index');

var app = getApp()

Page({
  data: {
    selected: false,
    tableID: 373, // 从 https://cloud.minapp.com/dashboard/ 管理后台的数据表中获取
    categories: [],
    postList: [],

  },

  onLoad(options) {
    console.log("run here.");
    this.setData({
      profile: app.getUserInfo()
    })
    //this.fetchBookList()
    this.fetchPostCategories();
    this.fetchPostList();


  },
  selectCategory: function (event) {

    var selectedIndex = event.currentTarget.dataset.index;
    var categoryId = event.currentTarget.dataset.categoryId;
    for (var i = 0; i < this.data.categories.length; i++) {
      if (selectedIndex == i) {
        this.data.categories[i].selected = !this.data.categories[i].selected;

        //选中状态
        if (this.data.categories[i].selected) {
          this.fetchPostList(categoryId);
        } else {
          //取消状态
          this.fetchPostList();
        }
      } else {
        this.data.categories[i].selected = false;
      }
    }
    this.setData({
      categories: this.data.categories
    });




  },
  onShow: function () {
    //每次页面展示时都重新获取一遍数据
    //this.fetchPostList();
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
  fetchPostList(categoryId) {
    let that = this
    let tableID = 628;//post TableID
    let params = {};
    if (categoryId) {
      params = {
        tableID,
        category_id: categoryId
      }
    } else {
      params = {
        tableID
      }
    }

    wx.BaaS.getRecordList(params).then((res) => {
      
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
        postList: res.data.objects,
      })
    }, (err) => {
      console.log(err);
    })
  }


})