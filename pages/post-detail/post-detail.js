//index.js
//获取应用实例
const wxParser = require('../../wxParser/index');

var app = getApp()

Page({
  data: {
    postTitle: '',
    categoryName: '',
    imagePaths: [],
    tableId: 628
  },

  onLoad(options) {
    console.log(options);
    //测试渲染富文本
    let that = this;

    let html = ``;
    // 获取内容详情
    let tableID = that.data.tableId;
    let recordID = options.postId;

    let objects = { tableID, recordID };
    wx.BaaS.getRecord(objects).then((res) => {

      that.setData({
        postTitle: res.data.title,
        imagePaths:res.data.image_paths
      })
      html = res.data.content;


      wxParser.parse({
        bind: 'richText',
        html: html,
        target: that,
        enablePreviewImage: false, // 禁用图片预览功能
        tapLink: (url) => { // 点击超链接时的回调函数
          // url 就是 HTML 富文本中 a 标签的 href 属性值
          // 这里可以自定义点击事件逻辑，比如页面跳转
          wx.navigateTo({
            url
          });
        }
      });
    }, (err) => {
      console.dir(err)
    });





  }

})