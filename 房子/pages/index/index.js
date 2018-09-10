//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    selectlist: [],
    daxz: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {

    wx.showLoading({
      title: '客官请稍等...',
      mask: true
    })
    var that = this;
    var list = [];
    var list1 = [];
    var indexlist = [];
    wx.request({
      url: 'https://zhongbinxiansheng.com/fangyuan/getPmukuai',
      success(e) {
        wx.request({
          url: 'https://zhongbinxiansheng.com/fangyuan/getPmukuai?type=1',
          success(e1) {
            var array = e.data.data
            var array1 = e1.data.data
            var a = null;
            for (var i = 0; i < array.length; i++) {
              if (array[i].value == 'address' || array[i].value == 'huxing') {
                a = array[i]
                for (var j = 0; j < array1.length; j++) {
                  if (array[i].fid == array1[j].pid) {
                    list.push(array1[j].value);
                  }
                }
                list1.push({
                  'a': a,
                  'list': list
                });
                a = null;
                indexlist.push({
                  'text': list1[i].list[0],
                  'fname': array[i].value
                })
                list = [];
              }
            }
            wx.setStorageSync('data', list1)
            that.setData({
              showlist: list1,
              selectlist: indexlist
            })
            wx.hideLoading();
          }
        })
      },
      complete() {
        wx.request({
          url: app.globalData.testLinkUrl + 'fangyuan/module/search',
          success(e) {
            console.log(e)
            wx.setStorageSync('maxModel', e.data.data)
            wx.setStorageSync('minModel', e.data.eight)
          },
          fail(e){
            console.log(e)
          }
        })
      }
    })
  },
  onShow: function() {

  },
  // bindPickerChange: function(e) {
  //   var list1 = this.data.selectlist;
  //   list1[this.data.idx].text = this.data.dqxz.list[e.detail.value]
  //   console.log(list1)
  //   this.setData({
  //     selectlist: list1
  //   })
  // },
  // tijiao: function() {
  //   var list = this.data.selectlist;
  //   var tiaojian = '?a=1';
  //   var zj = {};
  //   var mj = {};
  //   for (var i = 0; i < list.length; i++) {
  //     if (list[i].text != "请选择" && list[i].fname != 'zujin' && list[i].fname != 'mianji') {
  //       if (list[i].fname != 'huxing' && list[i].fname != 'address') {
  //         tiaojian += '&' + list[i].fname + '=' + list[i].text
  //       } else {
  //         if (list[i].fname == 'huxing') {
  //           wx.setStorageSync('huxing', list[i].text)
  //         }
  //         if (list[i].fname == 'address') {
  //           wx.setStorageSync('address', list[i].text)

  //         }
  //       }
  //     } else {
  //       if (list[i].fname == 'zujin') {
  //         zj = list[i];
  //       }
  //       if (list[i].fname == 'mianji') {
  //         mj = list[i]
  //       }
  //     }
  //   }
  //   var maxzj = 0;
  //   var minzj = 0;
  //   var maxmj = 0;
  //   var minmj = 0;

  //   if (mj.text.indexOf('所有') < 0) {
  //     var mj = mj.text.split('-')
  //     minmj = mj[0]
  //     maxmj = mj[1];
  //     tiaojian += '&minMianji=' + minmj + '&maxMianji=' + maxmj
  //   }

  //   if (zj.text.indexOf('房东') < 0) {
  //     if (zj.text.indexOf('以上') > 0) {
  //       minzj = zj.text.substring(0, zj.text.indexOf('万'))
  //       tiaojian += '&minZujin=' + parseInt(minzj) * 10000
  //     }
  //     if (zj.text.indexOf('以下') > 0) {
  //       maxzj = zj.text.substring(0, zj.text.indexOf('万'))
  //       tiaojian += '&maxZujin=' + parseInt(maxzj) * 10000
  //     }
  //     if (zj.text.indexOf('-') > 0) {
  //       var a = zj.text.split('-')
  //       minzj = a[0].substring(0, a[0].indexOf('万'))
  //       maxzj = a[1].substring(0, a[1].indexOf('万'))
  //       tiaojian += '&maxZujin=' + parseInt(maxzj) * 10000 + '&minZujin=' + parseInt(minzj) * 10000
  //     }
  //   }
  //   console.log(tiaojian)
  //   wx.setStorageSync('aa', {
  //     'data': tiaojian
  //   })
  //   wx.navigateTo({
  //     url: '../huros/hours',
  //     success() {

  //     }
  //   })
  // },
  // aa: function(e) {
  //   this.setData({
  //     dqxz: this.data.showlist[e.currentTarget.dataset.ida],
  //     idx: e.currentTarget.dataset.ida
  //   })
  // },
  onShareAppMessage: function() {
    return {
      path: '/pages/index/index'
    }
  },
  house() {
    wx.navigateTo({
      url: '../house_type/house_type',
    })
  },
  rescue() {
    wx.navigateTo({
      url: '../rescue_type/rescue_type',
    })
  }
})