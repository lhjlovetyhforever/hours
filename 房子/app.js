//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
        wx.request({
          url: 'https://zhongbinxiansheng.com/fangyuan/openid?code='+res.code,
          success(e){          
            wx.setStorageSync('openid', e.data.openid )
            wx.request({
              url: 'https://zhongbinxiansheng.com/fangyuan/config',
              success(e){
                console.log(e.data.uploadMoney)
                wx.setStorageSync('upLoadHouse', e.data.uploadMoney )
              }
            })
          }
        })

      }
    })
  },
  globalData: {
    userInfo: null,
    testLinkUrl:'https://zhongbinxiansheng.com/',
    linkUrl:'https://zhongbinxiansheng.com/'
  }
})