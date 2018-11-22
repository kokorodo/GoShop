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

app.isLogon = function(){
  var token = $api.getStorage('unionid');
  if(null == token || '' == token){
    $api.setStorage('loginFlag',false);
    return false;
  } else {
    $api.setStorage('loginFlag',true);
    return true;
  }
}


app.storageLoginInfo = function(obj){
  $api.setStorage('username',obj.user_name);
  $api.setStorage('nickName',obj.nick_name);
  $api.setStorage('avatar',obj.user_avatar);
  $api.setStorage('userToken',obj.user_token);
  $api.setStorage('unionid',obj.user_unionid);
  $api.setStorage('loginFlag',true);
}

app.storageUserInfo = function(obj){
  $api.setStorage('userId',obj.user_id);
  $api.setStorage('userEmail',obj.user_email);
  $api.setStorage('userPhone',obj.user_phone);
  $api.setStorage('groupId',obj.group_id);
  $api.setStorage('userGroupName',obj.user_group_name);
  $api.setStorage('userSex',obj.user_sex);
  $api.setStorage('userBirthday',obj.user_birthday);
  $api.setStorage('userIntegralNum',obj.user_integral_num);
  $api.setStorage('integralType2Num',obj.integral_type_2_num);
  $api.setStorage('avatar',obj.user_avatar);
  $api.setStorage('userMoney',obj.user_money);
}



app.cleanLoginStorage = function(){
  $api.rmStorage('username');
  $api.rmStorage('nickName');
  $api.rmStorage('avatar');
  $api.rmStorage('userToken');
  $api.rmStorage('unionid');
  
  $api.rmStorage('userId');
  $api.rmStorage('userEmail');
  $api.rmStorage('userPhone');
  $api.rmStorage('groupId');
  $api.rmStorage('userGroupName');
  $api.rmStorage('userSex');
  $api.rmStorage('userBirthday');
  $api.rmStorage('userIntegralNum');
  $api.rmStorage('integralType2Num');
  $api.rmStorage('userMoney');
  
  $api.setStorage('loginFlag',false);
}


/**
 * 将搜索关键字加入到历史记录中去 
 */
app.storageSchItem = function(item){
  var maxSize = 30;
  var ls = app.listStorageSchItem();
  for(var i=0;i<ls.length;i++){
    var it = ls[i];
    if(item == it) return ;
  }
  
  ls.unshift(item);
  
  if(ls.length > maxSize){
    var rs = ls.length - maxSize;
    for(var i=0;i<rs;i++){
      ls.pop();
    }
  }
  
  
  $api.setStorage('hisList',$api.jsonToStr(ls));
}


/**
 * 获取保存的搜索记录列表 
 */
app.listStorageSchItem = function(){
  var hisList = [];
  var strList = $api.getStorage('hisList');
  if('string' == typeof(strList)){
    hisList = $api.strToJson(strList);
  }
  return hisList;
}


/**
 * 删除历史数据保存项目 
 */
app.cleanSchItem = function(){
  $api.rmStorage('hisList');
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


app.openForgotPwd = function(param){
  if(typeof(param) != 'object' || null == param){
    param = {};
  }
  api.openWin({
    name: 'Forgot_Pwd_Win',
    url: 'forgot_pwd_win.html',
    showProgress : true,
    pageParam : param
  });
}


window.$yugo = app;
}(window))