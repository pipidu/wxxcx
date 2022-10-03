var wxkey="null";
var online = false;
var qqdata = "null";
var choose;
var url_kj;
var url_yx;
var url_qg;

Page({
  data: {
    htmlText: '<h1>ID获取失败,请返回主页重新登录</h1>',
  },
  onLoad() {
    wx.setNavigationBarTitle({ title: 'Du' })
    const that = this;
     wx.getStorage({
      key: 'wxxx',
      success (res) {
        wxkey = res.data;
        that.setData({ htmlText:"<h1>Success</h1><p>ID:" + res.data+"</p>" });
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
        that.setData({ onlinesta: "电脑端不在线" });
        online=false;
      }else{
        that.setData({ onlinesta: "在线" });
        online=true;
      }
      
    }
    
  })};
},
getqq(){ 
  console.log("getQQ");  
  const that = this;
  if (online==true){
    wx.request({
      url: 'https://service-mtqca1ok-1301441782.gz.apigw.tencentcs.com/release/?pages=getq&id=' + wxkey,
      success(res) {
        qqdata=res.data;
          that.setData({ getqqsta: "<p>如获取结果为空,请再次检查设备状态<br>获取结果:<br>"+res.data +"</p>"});
  }})
  }else{
    wx.showToast({
      title: '未上线',
    })
    that.setData({ getqqsta: "请先 检查设备状态/上线电脑端" });
  }
},
copywxtap() {
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
   }},
   loginqq() {
    const that = this;
    if ( wxkey == "null"){
      wx.showToast({
        title: 'NULL',
      })
    }else{
      if (qqdata =="null"){
        wx.showToast({
          title: '请按顺序操作',
        })
      }else{
      console.log(choose);
      if (choose == null){
        wx.showToast({
          title: 'NULL',
        })
      }else{

        wx.request({
          url: 'https://service-mtqca1ok-1301441782.gz.apigw.tencentcs.com/release/?pages=geturls&id=' + choose+"&qqdata="+qqdata,
          success(res) {
           console.log(res.data);
           var jsonres = res.data;
           if (jsonres == "nope"){
            wx.showToast({
              title: 'nope',
            })
            that.setData({ 
              getmsg:"URL获取失败",
              kj: "",
              qg: "",
              yx: "",
             });
           }else{
           url_kj=jsonres.kj;
           url_qg=jsonres.qg;
           url_yx=jsonres.yx;
           that.setData({ 
             getmsg:"URL获取成功",
             kj: url_kj,
             qg: url_qg,
             yx: url_yx,
            });
          }
          }
          
        })

      }}
     }},
     inputqq: function (options) {
      let value = options.detail.value;
      choose = value;
    },copyyx() {
      wx.setClipboardData({
        data: url_yx,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              console.log(res.data) ;
            }
          })
        }
        })
       },copykj() {
        wx.setClipboardData({
          data: url_kj,
          success: function (res) {
            wx.getClipboardData({
              success: function (res) {
                console.log(res.data) ;
              }
            })
          }
          })
         },copyqg() {
          wx.setClipboardData({
            data: url_qg,
            success: function (res) {
              wx.getClipboardData({
                success: function (res) {
                  console.log(res.data) ;
                }
              })
            }
            })
           },
})

