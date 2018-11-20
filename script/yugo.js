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