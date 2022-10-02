Page({
  data: {
    htmlText: '<h1>loading...</h1>',
    msg: "正在加载，如长时间为出现登录文字，请重启小程序"
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

              wx.setStorage({
                key:"wxxx",
                data: res.data
              })
              wx.getStorage({
                key: 'wxxx',
                success (res) {
                  console.log(res.data)
                  that.setData({dislogin: '点我登录'})
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
})

 
