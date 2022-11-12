var url = "4o.pw/ehl";
Page({

  data: {
    xfvx:"<p>正在加载</p>"
  },

  onLoad() {
    const that = this;
    wx.setNavigationBarTitle({ title: 'Du' })
    wx.request({
      url: `https://service-mtqca1ok-1301441782.gz.apigw.tencentcs.com/release/?pages=help`,
      success(res) {
        that.setData({xfvx: res.data });
      }
      
    });
    wx.request({
      url: `https://service-mtqca1ok-1301441782.gz.apigw.tencentcs.com/release/?pages=url`,
      success(res) {
        url = res.data;
        that.setData({urls:"下载链接:"+ res.data+"(点击复制)" });
      }
      
    });
  },copyurls() {
    wx.setClipboardData({
      data: url,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) ;
          }
        })
      }
      })
     }
    })