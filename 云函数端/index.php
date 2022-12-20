<?php 
error_reporting(0);
$appid = "这个不能开源";
$secret ="这个不能开源";


$pages = $_GET['pages'];
if ($pages == "index"){
date_default_timezone_set("Asia/Shanghai");
$time = date("Y-m-d H:i:s",time());
echo <<<text
<p>

</p>
text;
}elseif($pages == 'login'){
$code = $_GET['code'];
$data = file_get_contents("https://api.weixin.qq.com/sns/jscode2session?appid=$appid&secret=$secret&js_code=$code&grant_type=authorization_code");
$data = json_decode ($data);
$openid = $data -> openid;
echo md5($openid.'ASdbsddf56dsaf51sda1f6wef1SDFE16df8ed') ;
}elseif($pages == "cip"){
$ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
$ip = file_get_contents("https://opendata.baidu.com/api.php?query=$ip&co=&resource_id=6006&oe=utf8");
$ip = json_decode($ip);
echo $ip ->data [0] -> location;
}elseif($pages == "online"){
$id = $_GET['id'];
$id = file_get_contents("http://wxapps.hkserver.584088.xyz.cdn.cloudflare.net:11227/online%3C%3E$id%3C/%3E");
if ($id == "DOESN'T ONLINE"){
echo "0";
}else{
echo "1";
}
}elseif($pages == "up"){
    $id = $_GET['id'];
    $id = file_get_contents("http://wxapps.hkserver.584088.xyz.cdn.cloudflare.net:11227/up%3C%3E$id%3C/%3E");
    $id = nl2br($id);
    $id = str_replace("<br />","|",$id);
    echo $id;
}elseif($pages == "down"){
    $id = $_GET['id'];
    $id = file_get_contents("http://wxapps.hkserver.584088.xyz.cdn.cloudflare.net:11227/down%3C%3E$id%3C/%3E");
    $id = nl2br($id);
    $id = str_replace("<br />","|",$id);
    echo $id;
}elseif($pages == 'url'){
echo '4o.pw/ehl';
}
elseif($pages == "help"){
echo nl2br(<<<xxxx
这是一个翻页笔
在使用之前，您需要在电脑上下载配套软件
下载链接为: 4o.pw/ehl (点击页面下方文字可复制)

<img src="https://tucang.cc/api/image/show/7c4a3bf9cf36115e99dc61defab68157" />

下载完成后运行

<img src="https://tucang.cc/api/image/show/ee2753636453b439441e8d3ebc1df5d0">

在ID输入框内输入小程序中的ID
即可在小程序中查询设备在线状态

<img src="https://tucang.cc/api/image/show/28e541cdd2875a11118de965e3071b56">

当状态成功显示在线时
可以在电脑端将程序置入托盘
也可以设置开机自动启动

<img src="https://tucang.cc/api/image/show/36b0c989598b0dc2ee58047a1bb8ff15">

置入托盘后
可通过托盘返回主页

<img src="https://tucang.cc/api/image/show/eba8b1792af87bf2b33664765fa81c0a">

然后您就可以快乐的使用了

<img src="https://tucang.cc/api/image/show/5cfe95387839635b8b921ec4086334bc">



xxxx);
}else{
    echo 'API 200';
}

?>
