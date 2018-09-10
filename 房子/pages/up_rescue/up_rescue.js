// pages/up_house/up_house.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MaxModelList: null,
    MinModelList: null,
    selece1: '请选择',
    selece0: '请选择',
    newMinModelList: [],
    uploadMoney: 0,
    minId: null,
    maxId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
      MaxModelList: wx.getStorageSync('maxModel'),
      MinModelList: wx.getStorageSync('minModel'),
    })
    console.log(this.data.MaxModelList)
    console.log(this.data.MinModelList)
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
    var that = this;
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
    if (that.data.selece0 == '请选择' || that.data.selece1 == '请选择') {
      wx.showToast({
        title: '客官,请输入正确的信息哦~',
        icon: 'none'
      })
      return
    } else {
      wx.request({
        method: 'POST',
        url: app.globalData.testLinkUrl + 'fangyuan/eight/add?maxId=' + that.data.maxId + '&minId=' + that.data.minId + '&content=' + e.detail.value.remark + '&phone=' + e.detail.value.tel + '&title=客户上传',
        success: () => {
          wx.showToast({
            title: '添加成功~',
            icon: 'none',
            mask: true,
            duration: 1000
          })
          setTimeout(function () {
            wx.hideLoading()
            wx.navigateTo({
              url: '../rescue/rescue?title=添加服务',
            })
          }, 1000)
        },
        fail(e) {
          console.log("错误信息")
          wx.showModal({
            title: '错误信息',
            content: e.errMsg,
          })
          console.log('发生意外错误~请联系管理员')
          wx.showToast({
            title: '发生意外错误~请联系客服',
            icon: "none"
          })
        }
      })
      //支付
      // wx.showModal({
      //   title: '客官您好~',
      //   content: '能否打赏个小费,让我们为您持续提供服务呢',
      //   cancelText: '不打赏',
      //   cancelColor: '#D9D9D9',
      //   confirmText: '打赏',
      //   confirmColor: '#FF4500',
      //   success(e1) {
      //     if (e1.confirm == true) {
      //       wx.showLoading({
      //         title: '请等待...',
      //         mask: true
      //       })
      //       wx.request({
      //         url: 'https://zhongbinxiansheng.com/fangyuan/pay/xiadan?openid=' + wx.getStorageSync('openid') + '&money=' + (that.data.uploadMoney * 100).toString(),
      //         // url: 'https://zhongbinxiansheng.com/fangyuan/pay/xiadan?openid=' + wx.getStorageSync('openid') + '&money=1',
      //         success(data) {
      //           wx.request({
      //             url: 'https://zhongbinxiansheng.com/fangyuan/pay/sign?repay_id=' + data.data.prepay_id,
      //             success: function(f) {
      //               wx.requestPayment({
      //                 timeStamp: f.data.timeStamp,
      //                 nonceStr: f.data.nonceStr,
      //                 package: f.data.package,
      //                 signType: 'MD5',
      //                 paySign: f.data.paySign,
      //                 success: function(g) {
      //                   if (g.errMsg == "requestPayment:ok") {
      //                     wx.request({
      //                       method: 'Post',
      //                       url: app.globalData.testLinkUrl + 'fangyuan/eight/add?maxId=' + that.data.maxId + '&minId=' + that.data.minId + '&content=' + e.detail.value.remark + '&phone=' + e.detail.value.tel+'&title=客户上传',
      //                       success: () => {
      //                         wx.showToast({
      //                           title: '添加成功~',
      //                           icon: 'none',
      //                           mask: true,
      //                           duration: 1000
      //                         })
      //                         setTimeout(function () {
      //                           wx.hideLoading()
      //                           wx.navigateTo({
      //                             url: '../rescue/rescue?title=添加服务',
      //                           })
      //                         }, 1000)
      //                       },
      //                       fail(e){
      //                         console.log('发生意外错误~请联系管理员')
      //                         wx.showToast({
      //                           title: '发生意外错误~请联系客服',
      //                           icon: "none"
      //                         })
      //                       }
      //                     })
      //                   }
                        
      //                 },
      //                 fail(e) {
      //                   wx.hideLoading()
      //                   wx.showToast({
      //                     title: '付款失败',
      //                     icon: "none"
      //                   })
      //                 },
      //                 fail(e) {
      //                   wx.hideLoading()
      //                   wx.showToast({
      //                     title: '付款失败',
      //                     icon: "none"
      //                   })
      //                 }
      //               })
      //             },
      //             fail() {
      //               wx.hideLoading()
      //               wx.showToast({
      //                 title: '付款失败',
      //                 icon: "none"
      //               })
      //             }
      //           })
      //         },
      //         fail() {
      //           wx.hideLoading();
      //         }
      //       })
      //     }
      //   }
      // })
    }
  },
  qx: () => {
    wx.navigateBack()
  },
  bindPickerChange(e) {
    wx.showLoading({
      title: '',
      mask:true
    })
    var a = this
    //更新小分类
    if (e.target.id == 1) {
      var sel = a.data.MaxModelList[e.detail.value].title
      console.log('maxid='+a.data.MaxModelList[e.detail.value].id);
      var tempMinList = [];
      for (let i = 0; i < a.data.MinModelList.length; i++) {
        if (a.data.MinModelList[i].maxId == a.data.MaxModelList[e.detail.value].id) {
          tempMinList.push({
            'id': a.data.MinModelList[i].id,
            'maxId': a.data.MinModelList[i].maxId,
            'minTitle': a.data.MinModelList[i].minTitle,
            'money': a.data.MinModelList[i].money,
            'uploadMoney': a.data.MinModelList[i].uploadMoney
          })
        }
      }
      a.setData({
        selece1: sel,
        newMinModelList: tempMinList,
        selece0: '请选择',
        maxId: a.data.MaxModelList[e.detail.value].id
      })
      wx.hideLoading()
    } else {
      //存入选择的小分类信息
      var sel = a.data.newMinModelList[e.detail.value].minTitle
      wx.setStorageSync('minModelId', a.data.newMinModelList[e.detail.value].id)
      console.log(sel)
      a.setData({
        selece0: sel,
        uploadMoney: a.data.newMinModelList[e.detail.value].uploadMoney,
        minId: a.data.newMinModelList[e.detail.value].id
      })
      wx.hideLoading()
    }
  }
})