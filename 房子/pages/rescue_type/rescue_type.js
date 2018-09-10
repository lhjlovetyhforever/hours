// pages/house_type/house_type.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxModelList: wx.getStorageSync('maxModel')
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
      maxModelList: wx.getStorageSync('maxModel')
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
  a: (e) => {
    console.log(e)
    wx.setStorageSync('maxModelId', e.currentTarget.id)
    setTimeout(function() {
      wx.navigateTo({
        url: '../rescue_data/rescue_data?title=' + e.currentTarget.dataset.title,
      })
    }, 200)

  },
  b: () => {
    wx.navigateTo({
      url: '../up_rescue/up_rescue',
    })
  }
})