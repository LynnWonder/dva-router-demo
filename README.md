# react-dva-counter

## 入门dva框架的Counter Demo,
 
### 搭配react-router-config的简单使用
- ~~搭配使用redirect 重定向实现所有路由匹配不到时跳转home主页~~
- 使用react-router-config配置静态路由，通过renderRoutes返回路由配置组件<Switch><Route/></Switch>
- renderRoutes传入额外参数判断用户登录态，做路由鉴权

### todolist使用：
- 新增时可以回车结束新增，也可以直接点击按钮新增
- 修改时点击修改进入可以更改模式：回车结束修改，此时不能编辑input文本框
- fix bug:删除指定条目
### input使用：
- 上传图片并且能回显在页面中
### zoom使用：
/zoom：新增了手势缩放，浏览器端调试的时候需要切换到手机调试模式则能看效果(只能doubleTap的时候可以)
- 方法一：手机端请用charles添加map local映射，自己编一个网址，同时修改电脑host对应到127.0.0.1方便DNS查找的时候查找到本地网页，此时可以查看手势缩放效果；
- 方法二：ipconfig查看本机IP，手机访问ip:port/routes即可
以上
### lottie使用：
/lottie下可以toggle点击like
/lottie/more是copy的react-lottie中的demo
