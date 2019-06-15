const context = require.context('./', false, /\.js$/); //这里的false表示不遍历子目录
export default context
  .keys()  //object.keys()返回所有可枚举属性
  .filter(item => item !== './index.js') //过滤掉当前的index.js
  .map(key => context(key)); //获取所有的key值包含到context中
