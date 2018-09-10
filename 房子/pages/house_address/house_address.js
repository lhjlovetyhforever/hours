// pages/house_address/house_address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: wx.getStorageSync('data')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('huxing')//页面标题为路由参数
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
    this.setData({
      addressList: wx.getStorageSync('data')
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
    wx.setStorageSync('address', e.currentTarget.id)
    wx.navigateTo({
      url: '../huros/hours',
    })
  },
  b: () => {
    wx.navigateTo({
      url: '../up_house/up_house',
    })
  }
})