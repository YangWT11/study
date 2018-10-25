>1：#代表网页中的一个位置，例如```https://www.baidu.com#content```，这代表网页一打开就会到达content这个位置

>2：http请求中是不会带#号的，因此访问```https://www.baidu.com#content```时，其实实际的http请求是
```
GET /index.html HTTP/1.1
Host: www.example.com
```
>3：如果你的http请求中带有#，例如```https://www.baidu.com?color=#fff```，这样服务器端收到的请求会是```https://www.baidu.com?color=```，
这并没有什么意义，如果要发送类似的需要进行```UrlEncode```，变成```https://www.baidu.com?color=%23fff```即可

>4：改变#后的内容浏览器不会重新发起页面请求，而是跳转到对应的位置；同时浏览器的浏览记录中会保留每次记录，使用回退可以回到上一个位置

>5：window.location.hash能够读取到这个值，例如```https://www.baidu.com#content```，此时```window.location.hash='#content'```

**总结摘取自阮一峰的#总结**