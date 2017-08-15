var app = getApp();
Page({
  data: {
    categories: [],
    categoryIndex: 0,
    content: null,
    files: [],
    filePaths: [],
    maxNumber: 0,//上传图片计算
    postCategoryTableId: 597,
    postTableID: 628//post表ID
  },
  onLoad(options) {
    this.fetchCategoryList()
  },
  chooseImage: function (e) {


    let params = {};
    params.formData = {

    }
    var that = this;
    that.data.maxNumber++;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图
        that.setData({
          files: that.data.files.concat(res.tempFilePaths),
          maxNumber: that.data.maxNumber
        });
        //提交到后台
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          params.filePath = res.tempFilePaths[i];
          wx.BaaS.uploadFile(params).then((res) => {
            // success. 服务器成功响应
            /* 注: 只要是服务器有响应的情况都会进入 success, 即便是 4xx，5xx 都会进入
              这是微信的处理方式与 BaaS 服务(器)无关
              如果上传成功则会返回资源远程地址
              如果上传失败则会返回失败信息
            */
            console.log(res);
            var imagePath = JSON.parse(res.data).path;

            that.data.filePaths.push(imagePath);
            // 目前开发者工具上传文件功能有 bug, 请务必使用设备进行操作，同时打开 console 观察结果
          }, (err) => {
            // 微信自身系统级别错误
            console.dir(err);
          })
        }

      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },


  //bindCategoryChange
  bindCategoryChange: function (e) {
    console.log('picker category 发生选择改变，携带值为', e.detail.value);

    this.setData({
      categoryIndex: e.detail.value
    })
  },
  //获取帖子分类列表
  fetchCategoryList() {
    let that = this
    let tableID = this.data.postCategoryTableId
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

  //添加帖子
  submitPost: function (e) {
    let userId = app.getUserId();

    let title = e.detail.value.title;
    let content = e.detail.value.content;

    let that = this;
    let tableID = that.data.postTableID; //gallery表ID


    let imagePaths = that.data.filePaths;
    let categoryId = that.data.categories[that.data.categoryIndex].id;

    let data = {
      user_id: userId,
      title: title,
      content: content,
      image_paths: imagePaths,
      category_id: categoryId
    }
    let objects = {
      tableID,
      data
    }

    // 创建一个数据项
    wx.BaaS.createRecord(objects).then((res) => {

      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000
      });

      setTimeout(function () {
        wx.switchTab({
          url: '/pages/post/post'
        });
      }, 2000);


    }, (err) => {
      console.log(err)
    })
  },



})