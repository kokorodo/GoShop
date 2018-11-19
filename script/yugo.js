/**
 * 扩展工具类 
 * @param {Object} window
 */
(function(window){
var app = {};

  
/**
 * 关闭当前窗口 
 */
app.clsWin = function(name){
  var p = {};
  if(typeof(name) == 'string' && null != name && ''!=name ){
    p['name'] = name;
  }
  api.closeWin(p);
}


/**
 *打开登录窗口 
 * @param {Object} param
 */
app.openLoginWin = function(param){
  if(typeof(param) != 'object' || null == param){
    param = {};
  }
  api.openWin({
    name: 'Login_Win',
    url: 'login_win.html',
    showProgress : true,
    pageParam : param
  });
}


/**
 * 打开注册窗口 
 * @param {Object} param
 */
app.openRegWin = function(param){
  if(typeof(param) != 'object' || null == param){
    param = {};
  }
  api.openWin({
    name: 'Rge_Win',
    url: 'register_win.html',
    showProgress : true,
    pageParam : param
  });
}


window.$yugo = app;
}(window))