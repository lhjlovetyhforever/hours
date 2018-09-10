// pages/up_house/up_house.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List: wx.getStorageSync('data'),
    selece1: '请选择',
    selece0: '请选择'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(this.data.List)
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
    this.setData({
      List: wx.getStorageSync('data')
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      path: '/pages/index/index'
    }
  },
  bindsubmit(e) {
    console.log(e)
    var a = this
    if (e.detail.value.remark == "" || e.detail.value.remark.length>=120) {
      wx.showToast({
        title: '客官,请输入120字以内哦~',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.tel == "" || e.detail.value.tel.length != 11) {
      wx.showToast({
        title: '客官,请输入正确的联系方式哦~',
        icon: 'none'
      })
      return
    }
    if (a.data.selece0 == '请选择' || a.data.selece1 == '请选择') {
      wx.showToast({
        title: '客官,请输入正确的信息哦~',
        icon: 'none'
      })
      return
    } else {
      wx.showModal({
        title: '客官您好~',
        content: '能否打赏个小费,让我们为您持续提供服务呢',
        cancelText: '不打赏',
        cancelColor: '#D9D9D9',
        confirmText: '打赏',
        confirmColor: '#FF4500',
        success(e1) {
          if (e1.confirm == true) {
            wx.showLoading({
              title: '客观，请稍等片刻~',
              mask: true
            })
            wx.request({
              url: 'https://zhongbinxiansheng.com/fangyuan/pay/xiadan?openid=' + wx.getStorageSync('openid') + '&money=' + (wx.getStorageSync('upLoadHouse') * 100),
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
                          wx.request({
                            url: app.globalData.testLinkUrl + 'fangyuan/add?huxing=' + a.data.selece1 + '&address=' + a.data.selece0 + '&detail=' + e.detail.value.remark + '&tel=' + e.detail.value.tel + '&name=客户上传&price=1.68',
                            method: 'POST',
                            success: function(res) {
                              wx.showToast({
                                title: '添加成功~',
                                icon: 'none',
                                mask: true,
                                duration: 1000
                              })
                              setTimeout(function() {
                                wx.hideLoading()
                                wx.navigateTo({
                                  url: '../huros/hours',
                                })
                              }, 1000)
                            },
                            fail: function(res) {
                              wx.showToast({
                                title: '发生意外错误~请联系客服',
                                icon: "none"
                              })
                            }
                          })
                        }
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


    }
  },
  qx: () => {
    wx.navigateBack()
  },
  bindPickerChange(e) {
    var a = this
    if (e.target.id == 1) {
      var sel = a.data.List[1].list[e.detail.value]
      wx.setStorageSync('huxing', a.data.List[1].list[e.detail.value])
      console.log(sel)
      a.setData({
        selece1: sel
      })
    } else {
      var sel = a.data.List[0].list[e.detail.value]
      wx.setStorageSync('address', a.data.List[0].list[e.detail.value])
      console.log(sel)
      a.setData({
        selece0: sel
      })
    }
  }
})