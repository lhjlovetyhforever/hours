// pages/huros/hours.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 'none',
    datalist: null,
    dqfy: 0,
    tip: '哎呀!没有你要找的信息,看看别的选择吧',
    isShow: 'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showLoading({
      title: '客官请稍等...',
      mask: true
    })
    var list = [];
    var that = this
    var ps = decodeURI(decodeURI(wx.getStorageSync('minModelId')))
    console.log('minId'+ps)
    wx.request({
      url: app.globalData.testLinkUrl + 'fangyuan/eight/search?data=' + ps,
      success: (e) => {
        console.log(e.data.data)
        that.setData({
          datalist: e.data.data
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  lookDetail: function(e) {
    this.setData({
      show: '',
      dqfy: this.data.datalist[e.currentTarget.id]
    })
  },
  close: function() {
    var that = this;
    wx.showModal({
      title: '客官您好~',
      content: '能否打赏' + wx.getStorageSync('selMoney') +'元,联系服务专家电话呢',
      cancelText: '不打赏',
      cancelColor: '#D9D9D9',
      confirmText: '打赏',
      confirmColor: '#FF4500',
      success(e) {
        if (e.confirm == true) {
          wx.showLoading({
            title: '请等待...',
            mask: true
          })
          wx.request({
            url: 'https://zhongbinxiansheng.com/fangyuan/pay/xiadan?openid=' + wx.getStorageSync('openid') + '&money=' + (wx.getStorageSync('selMoney') * 100).toString(),
            // url: 'https://zhongbinxiansheng.com/fangyuan/pay/xiadan?openid=' + wx.getStorageSync('openid') + '&money=1',
            success(data) {
              wx.request({
                url: 'https://zhongbinxiansheng.com/fangyuan/pay/sign?repay_id=' + data.data.prepay_id,
                success: function(f) {
                  wx.requestPayment({
                    timeStamp: f.data.timeStamp,
                    nonceStr: f.data.nonceStr,
                    package: f.data.package,
                    signType: 'MD5',
                    paySign: f.data.paySign,
                    success: function(g) {
                      if (g.errMsg == "requestPayment:ok") {
                        wx.showModal({
                          title: '温馨提示',
                          content: '请拨打服务专家电话',
                          cancelText: '稍后联系',
                          cancelColor: '#D9D9D9',
                          confirmText: '立即联系',
                          confirmColor: '#76EE00',
                          showCancel: false,
                          success(e) {
                            if (e.confirm == true) {
                              wx.makePhoneCall({
                                phoneNumber: that.data.dqfy.phone,
                                success: function(res) {

                                },
                                fail: function(res) {

                                },
                                complete: function(res) {
                                  wx.navigateBack({
                                    delta: 1
                                  })
                                },
                              })
                            }
                          }
                        })
                      }
                      wx.hideLoading()
                    },
                    fail(e) {
                      wx.hideLoading()
                      wx.showToast({
                        title: '付款失败',
                        icon: "none"
                      })
                    },
                    fail(e) {
                      wx.hideLoading()
                      wx.showToast({
                        title: '付款失败',
                        icon: "none"
                      })
                    }
                  })
                },
                fail() {
                  wx.hideLoading()
                  wx.showToast({
                    title: '付款失败',
                    icon: "none"
                  })
                }
              })
            },
            fail() {
              wx.hideLoading();
            }
          })
        }
      }
    })
  },
  close1: function() {
    this.setData({
      show: 'none'
    })
  },
  onShareAppMessage() {
    return {
      path: '/pages/index/index'
    }
  },
  b(){
    wx.navigateTo({
      url: '../up_rescue/up_rescue',
    })
  }
})