Page({
  data: {
    htmlText: '<h1>loading...</h1>',
    Titlex: '<h1>功能列表:</h1>',
    msg: "正在加载",
    succ: true
  },
  onLoad() {
    wx.setNavigationBarTitle({ title: 'Du' })
    const that = this;
    wx.request({
      url: 'https://service-mtqca1ok-1301441782.gz.apigw.tencentcs.com/release/?pages=index',
      success(res) {
        that.setData({ htmlText: res.data });
      }
      
    });
    wx.request({
      url: 'https://service-mtqca1ok-1301441782.gz.apigw.tencentcs.com/release/?pages=cip',
      success(res) {
        that.setData({ cip : res.data });
      }
      
    });
    wx.login({
      success (res) {
        if (res.code) {
          wx.request({
            url: `https://service-mtqca1ok-1301441782.gz.apigw.tencentcs.com/release/?pages=login&code=${res.code}`,
            success(res) {
              that.setData({wxxx: res.data });
              that.setData({succ: false});
              wx.setStorage({
                key:"wxxx",
                data: res.data
              })
              wx.getStorage({
                key: 'wxxx',
                success (res) {
                  console.log(res.data)
                  that.setData({msg: ''})
                }
              })
              
            }
            
          });

        } else {
          that.setData({ wxxx: '登录失败！' + res.errMsg });
        }
      }
    })
  },
  onShareAppMessage: function () {

    return {
    title: '我也不知道这叫啥',
    desc: 'QQ免登录打开QQ邮箱、QQ空间、QQ群管的小程序',
    path: '/pages/index/index',
    imageUrl: '/shareimg/mzl.gif'
    }
    },togo() {
      wx.navigateTo({
        url: '../../pages/updown/index',
      })
  
       },
})

 
