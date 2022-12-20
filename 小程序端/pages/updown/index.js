var wxkey="null";
var online = false;


Page({
  data: {
    htmlText2: '<br><br>'
  },
  onLoad() {
    wx.setNavigationBarTitle({ title: '翻页笔' })
    const that = this;
     wx.getStorage({
      key: 'wxxx',
      success (res) {
        wxkey = res.data;
        that.setData({ htmlText:"<h1>翻页笔</h1><p>ID:" + res.data+" (点击复制)</p>" });
            }
        })
  },
  sta(){ 
  console.log("check online");  
  const that = this;
  if ( wxkey == "null"){
    that.setData({ onlinesta: "ID获取失败,请返回主页重新登录" });
  }else{
  wx.request({
    url: 'https://service-mtqca1ok-1301441782.gz.apigw.tencentcs.com/release/?pages=online&id=' + wxkey,
    success(res) {
      if (res.data == "0\n"){
        that.setData({ onlinesta: "不在线" });
        online=false;
      }else{
        that.setData({ onlinesta: "在线" });
        online=true;
      }
      
    }
    
  })};
},copywxtap() {
  if ( wxkey == "null"){
    
  }else{
  wx.showToast({
    title: '复制成功',
  })
  wx.setClipboardData({
    data: wxkey,
    success: function (res) {
      wx.getClipboardData({
        success: function (res) {
          console.log(res.data) ;
        }
      })
    }
    })
   }},up() {
    wx.request({
      url: 'https://service-mtqca1ok-1301441782.gz.apigw.tencentcs.com/release/?pages=up&id=' + wxkey,
      success(res) { 
      }
    })
     },
     down() {
      wx.request({
        url: 'https://service-mtqca1ok-1301441782.gz.apigw.tencentcs.com/release/?pages=down&id=' + wxkey,
        success(res) { 
        }
      })
       },
       gotox() {
        wx.navigateTo({
          url: '../../pages/updown/things',
        })
         },
})

