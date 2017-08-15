//app.js
App({
  onLaunch: function () {
    let that = this

    wx.getSystemInfo({
      complete(res) {
        if (res.errMsg == 'getSystemInfo:ok') {
          let systemInfo = {
            model: res.model,
            language: res.language,
            version: res.version,
            system: res.system,
            wH: res.windowHeight,
            wW: res.windowWidth
          }
          that.systemInfo = systemInfo
        }

      }
    })

    // 引入 BaaS SDK
    require('./utils/sdk-v1.0.9.js')

    // 从 BaaS 后台获取 ClientID
    let clientId = '5f1a706a0e625aeaf51f'



    let userId = this.getUserId();
    wx.BaaS.init(clientId)
    if (!userId) {
      wx.BaaS.login()
        .then(res => {
          console.log('BaaS is logined!')
        }).catch(err => {
          console.dir(err)
        })
    }
    
  },

  getUserId() {
    if (this.userId) {
      return this.userId
    }

    this.userId = wx.BaaS.storage.get('uid')
    return this.userId
  },

  getUserInfo() {

    if (this.userInfo) {
      return this.userInfo
    }

    this.userInfo = wx.BaaS.storage.get('userinfo')
    return this.userInfo
  }
})
