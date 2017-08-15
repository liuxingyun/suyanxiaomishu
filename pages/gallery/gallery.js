var app = getApp();

Page({
  data: {
    files: [],
    filePaths: [],
    maxNumber: 0
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

  submitGallery: function (e) {
    let userId = app.getUserId();

    let description = e.detail.value.description;

    let that = this;
    let tableID = 548; //gallery表ID


    let imagePaths = this.data.filePaths;

    let data = {
      user_id: userId,
      image_paths: imagePaths,
      description: description
    }
    let objects = {
      tableID,
      data
    }

    // 创建一个数据项
    wx.BaaS.createRecord(objects).then((res) => {

      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      });

      wx.redirectTo({
        url: '/pages/profile/profile'
      })
    }, (err) => {
      console.log(err)
    })
  },

})