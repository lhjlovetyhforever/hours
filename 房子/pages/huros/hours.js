// pages/huros/hours.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 'none',
    datalist: null,
    dqfy: 0,
    tip: '哎呀!没有你要找的信息,看看别的选择吧',
    isShow:'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title:wx.getStorageSync('address')
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
    wx.request({
      url: 'https://zhongbinxiansheng.com/fangyuan/search',
      method: 'POST',
      data: {
        'address': wx.getStorageSync('address'),
        'huxing': wx.getStorageSync('huxing')
      },
      success(e) {
        var data1 = e.data.data;
        console.log(data1)
        if (data1 != undefined && data1 != null) {
          for (var i = 0; i < data1.length; i++) {
            list.push({
              'time': that.getdate(data1[i].time),
              'tel': data1[i].tel,
              'mianji': data1[i].mianji,
              'price': data1[i].price,
              'address': data1[i].address,
              'detail': data1[i].detail,
              'zujin': data1[i].zujin,
              'huxing': data1[i].huxing
            })
          }
        }else{
          that.setData({
            isShow:''
          })
        }
        that.setData({
          datalist: list
        })
        wx.hideLoading();
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
      content: '能否打赏个小费,联系房主呢',
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
            url: 'https://zhongbinxiansheng.com/fangyuan/pay/xiadan?openid=' + wx.getStorageSync('openid') + '&money=' + (that.data.dqfy.price * 100).toString(),
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
                          content: '请拨打房东电话',
                          cancelText: '稍后联系',
                          cancelColor: '#D9D9D9',
                          confirmText: '立即联系',
                          confirmColor: '#76EE00',
                          showCancel: false,
                          success(e) {
                            if (e.confirm == true) {
                              wx.makePhoneCall({
                                phoneNumber: that.data.dqfy.tel,
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
  getdate(time) {
    var time1 = new Date();
    var time2 = new Date(time1.getFullYear(), time1.getMonth(), time1.getDate())
    var times1 = time2.getTime() / 1000;

    time1 = new Date(time)
    time2 = new Date(time1.getFullYear(), time1.getMonth(), time1.getDate())
    var times2 = time2.getTime() / 1000

    return parseInt((times1 - times2) / 86400)
  }
})