/**
 * 商城工具类
 * @param {Object} window
 */
( function(window) {
    var app = {};
    app.apiKey = '7de643aba25ea29d9c611e332571e623';
    app.ctx = 'http://shop.yugomall.com';
    app.apiCtx = app.ctx + '/Jsonapi';
    app.showLoadding = true;
    app.defPage = 1;
    app.maxSize = 20;
    
    
    //app.shopInfo = app.apiCtx + '/shopinfo';
    //app.goodsClass = app.apiCtx + '/goodsClass'

    app.chkConnect = function(callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '?apikey=' + app.apiKey,
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }

    app.shopInfo = function(callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/shopinfo?apikey=' + app.apiKey
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 商品分类
     * classId
     */
    app.getGoodsClass = function(classId, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/goodsClass?apikey=' + app.apiKey + '&class_id=' + classId,
        data : {
          values : {
            class_id : classId
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });

    }
    /**
     * 商品列表
     *
     * classId 必填 商品分类id不能为0
     * page 必填  调取页数，如果不填写默认是 1
     * qty 必填 每页显示的商品数量，如果不填写默认是 10

     */
    app.getGoodsList = function(classId, callback, page, qty) {
      __loadding();
      
      page = parseInt(page);
      qty = parseInt(qty);
      
      page = isNaN(page) ? app.defPage : page;
      qty  = isNaN(qty) ? app.maxSize : qty;
      
      api.ajax({
        url : app.apiCtx + '/goodsList?apikey=' + app.apiKey,
        data : {
          values : {
            class_id : classId,
            page : page,
            qty : qty
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }

    app.getGoodsInfo = function(classId, goodsId, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/goodsInfo?apikey=' + app.apiKey,
        data : {
          values : {
            class_id : classId,
            goods_id : goodsId
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 商品搜索
     */
    app.searchGoods = function(keywords, callback, page, qty) {
      __loadding();
      
      page = parseInt(page);
      qty = parseInt(qty);
      
      page = isNaN(page) ? app.defPage : page;
      qty  = isNaN(qty) ? app.maxSize : qty;
      
      api.ajax({
        url : app.apiCtx + '/searchGoods?apikey=' + app.apiKey,
        data : {
          values : {
            keywords : keywords,
            page : page,
            qty : qty
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 获取品牌
     */
    app.getGoodsBrand = function(callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/goodsBrand?apikey=' + app.apiKey
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }

    app.getBrandGoodsList = function(brandId, page, qty, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/brandGoodsList?apikey=' + app.apiKey,
        data : {
          values : {
            brand_id : brandId,
            page : page,
            qty : qty
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 用户唯一性标识，由用户端自行生成（开发者开发）
     * @param {Object} uid
     * @param {Object} callback
     */
    app.getCartData = function(uid, callback) {
      if ( typeof (uid) != 'string' || null == uid || '' == uid) {
        uid = 'unkow';
      }
      __loadding();
      api.ajax({
        url : app.apiCtx + '/cartData?apikey=' + app.apiKey,
        data : {
          values : {
            user_unionid : uid
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     *将商品加入到购物车中
     * @param {Object} classId  必填  商品分类id
     * @param {Object} goodsId  必填  商品id
     * @param {Object} buyGoodsNum 必填 购买数量
     * @param {Object} uid  必填  由用户端自行生成（开发者开发）
     * @param {Object} color  非必填 颜色标记（普通规格），只有在购买的商品有此值时，才需要传递
     * @param {Object} size 非必填 尺寸标记（普通规格），只有在购买的商品有此值时，才需要传递
     * @param {Object} specTagIdStr 非必填 规格id字符串，用英文逗号分割 ','（高级规格）
     * @param {Object} callback
     */
    app.add2Cart = function(classId, goodsId, buyGoodsNum, uid, color, size, specTagIdStr, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/addCart?apikey=' + app.apiKey,
        data : {
          values : {
            class_id : classId,
            goods_id : goodsId,
            buy_goods_num : buyGoodsNum,
            user_unionid : uid,
            color_value : color,
            size_value : size,
            spec_tag_id_str : specTagIdStr
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 更新购物车商品（修改购物商品数量）
     * @param {Object} goodsKey   必填  商品标识唯一性（相对于用户而言，可以在获取购物车信息时得到）
     * @param {Object} buyGoodsNum  必填  变更后的商品数量
     * @param {Object} uid  必填  用户唯一标识，由客户端生成
     * @param {Object} callback
     */
    app.updateCart = function(goodsKey, buyGoodsNum, uid, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/updateCart?apikey=' + app.apiKey,
        data : {
          values : {
            goods_key : goodsKey,
            buy_goods_num : buyGoodsNum,
            user_unionid : uid
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }

    app.getCartGoodsCount = function(uid, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/cartGoodsCount?apikey=' + app.apiKey,
        data : {
          values : {
            user_unionid : uid
          }
        }
      }, function(ret, err) {
        __doCallback(callback, ret, err);
      });
    }

    app.delCartGoods = function(goodsKey, uid, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/delCartGoods?apikey=' + app.apiKey,
        data : {
          values : {
            goods_key : goodsKey,
            user_unionid : uid
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 清空购物车
     * @param {Object} uid 必填 用户唯一性标识，由用户端自行生成（开发者开发）
     * @param {Object} callback
     */
    app.clearCart = function(uid, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/delCartGoods?apikey=' + app.apiKey,
        data : {
          values : {
            user_unionid : uid
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 获取用户注册项（系统后台配置）
     * @param {Object} callback
     */
    app.getRegItem = function(callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/registerItem?apikey=' + app.apiKey,
        data : {
          values : {
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 用户注册
     * @param {Object} userName   必填  注册用户名称
     * @param {Object} pwd    必填  密码
     * @param {Object} comPwd 必填  确认密码
     * @param {Object} email 非必填  电子邮箱，是否需要填写，要看上面获取的注册用户项，该参数是否返回 true
     * @param {Object} phone 非必填  手机号码，是否需要填写，要看上面获取的注册用户项，该参数是否返回 true
     * @param {Object} uid  必填  用户唯一标识，由客户端生成，该值不会对注册造成影响，它的作用，是将未登录状态下的购物车内信息，在登录或者注册完成后，进行更新
     * @param {Object} callback
     */
    app.register = function(userName, pwd, comPwd, email, phone, uid, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/register?apikey=' + app.apiKey,
        data : {
          values : {
            user_name : userName,
            user_password : pwd,
            user_com_passwd : comPwd,
            user_email : email,
            user_phone : phone,
            user_unionid : uid
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 注册协议
     */
    app.regAgm = function(callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/agreement?apikey=' + app.apiKey,
        data : {
          values : {
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 手机验证码
     * @param {Object} phone 必填 手机号码
     * @param {Object} captcha 必填 手机验证码，由外部设备自行生成，api不做生成处理
     * @param {Object} callback
     */
    app.regPhoneCaptcha = function(phone, captcha, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/phoneCaptcha?apikey=' + app.apiKey,
        data : {
          values : {
            user_phone : phone,
            phone_captcha : callback
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 获取用户登录项
     */
    app.getLoginItem = function(user, pwd, uid, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/loginItem?apikey=' + app.apiKey
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 用户登录
     *
     *   user_name 必填  用户名称同时也可以是手机号码或者邮箱，根据上面的登陆项接口获取状态是否为true，只是它们统一通过user_name进行登录处理
     *   user_password 必填  用户密码
     *   user_unionid  必填  用户唯一标识，由客户端生成，该值不会对登录造成影响，它的作用，是将未登录状态下的购物车内信息，在登录或者注册完成后，进行更新
     */
    app.login = function(user, pwd, uid, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/login?apikey=' + app.apiKey,
        data : {
          values : {
            user_name : user,
            user_password : pwd,
            user_unionid : uid
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 用户退出
     *  token 必填  用户登录状态值
     */
    app.logout = function(token, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/loginOut?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     *找回密码
     * user_name  必填  用户名
     * user_email  必填  用户邮箱
     */
    app.forgotPwd = function(user, email, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/forgotpasswd?apikey=' + app.apiKey,
        data : {
          values : {
            user_name : user,
            user_email : email
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 获取配送地址
     * @param {Object} token  必填  用户登录状态值
     * @param {Object} callback
     */
    app.getAddressList = function(token, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/addressList?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 保存配送地址
     * @param {Object} addr 地址对象
     * @param {Object} callback
     *
     * token 必填  用户登录唯一标识
     * addrId  非必填 为空时添加配送地址，不为空时更新配送地址
     * trueName 必填  收货人姓名
     * regionId 必填  最后选中的地区id，比如 设置的 北京市 朝阳区 那么region_id就是 朝阳区 的id
     * regionValue  必填  选中的所有地区的名称，比如 设置的 北京市 朝阳区 那么region_value就是 北京市 朝阳区
     * address 必填  详细地址
     * zipCode  必填  邮政编码
     * mobile 必填  手机号码
     * telAreaCode 非必填 座机号码的区号
     * phone 非必填 座机号码
     * telExt 非必填 座机分机号
     * default  非必填 是否为默认配送地址，1为默认配送地址
     */
    app.saveAddress = function(addr, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/saveAddress?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : addr['token'],
            address_id : addr['addrId'],
            true_name : addr['trueName'],
            region_id : addr['regionId'],
            region_value : addr['regionValue'],
            address : addr['address'],
            zip_code : addr['zipCode'],
            mod_phone : addr['mobile'],
            tel_area_code : addr['telAreaCode'],
            tel_phone : addr['phone'],
            tel_ext : addr['telExt'],
            addr_default : addr['default']
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     *  删除配送地址
     * @param {Object} token 必填 用户登录状态值
     * @param {Object} addressId 必填 配送地址id
     * @param {Object} callback
     */
    app.delAddress = function(token, addressId, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/delAddress?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            address_id : addressId
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     *获取地区列表 必填 上一级的地区id，0是获取顶级地区信息
     * @param {Object} regionId
     * @param {Object} callback
     */
    app.getRegions = function(regionId, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/region?apikey=' + app.apiKey,
        data : {
          values : {
            region_top_id : regionId,
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 购物车信息确认（提交订单前的确认）
     * @param {Object} token  必填  用户登录状态值
     * @param {Object} addressId  非必填 配送地址id
     * @param {Object} uid  必填  用户唯一标识，由客户端生成
     * @param {Object} callback
     */
    app.conformCart = function(token, addressId, uid, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/step?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            address_id : addressId,
            user_unionid : uid
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     *订单提交
     * @param {Object} obj
     * @param {Object} callback
     *
     * obj
     * uid 必填  用户唯一标识，由客户端生成
     * addressId  必填  已经选择的配送地址id
     * token  必填  用户登录唯一标识
     * paymentCode  必填  支付方式标识码（支付方式里的 editaction 值）
     * expressId  必填  配送方式id
     * integralBuyNum  非必填 用户使用的消费积分（只有购物车商品可以使用积分时，才会需要）
     * orderMessage 非必填 订单留言信息
     * invoiceTitle 非必填 发票抬头（文字形式）
     * invoiceContent 非必填 发票内容（文字形式）
     * shippingTime 非必填 送货时间（文字形式）
     */
    app.cartSubmit = function(obj, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/cartSubmit?apikey=' + app.apiKey,
        data : {
          values : {
            user_unionid : obj['uid'],
            address_id : obj['addressId'],
            user_token : obj['token'],
            payment_code : obj['paymentCode'],
            express_id : obj['expressId'],
            integral_buy_num : obj['integralBuyNum'],
            order_message : obj['orderMessage'],
            invoice_title : obj['invoiceTitle'],
            invoice_content : obj['invoiceContent'],
            shipping_time : obj['shippingTime']
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 获取用户信息
     * @param {Object} token 必填 用户登录状态值
     * @param {Object} callback
     */
    app.getUserInfo = function(token, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/userInfo?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 更新用户信息
     * @param {Object} token 必填 用户登录状态值
     * @param {Object} email 非必填 用户电子邮箱，是否必填，取决于 会员注册项 内 user_email 是否为true，当为 true时，user_email必填
     * @param {Object} sex 必填 用户性别，1 男、2 女、3 保密
     * @param {Object} phone 非必填  用户手机号码，是否必填，取决于 会员注册项 内 user_phone 是否为true，当为 true时，user_phone 必填
     * @param {Object} birthday 非必填 用户生日，格式类似于这样 1986-06-06
     * @param {Object} avatar 非必填 用户上传头像
     * @param {Object} callback
     */
    app.saveUserInfo = function(token, email, sex, phone, birthday, avatar, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/userInfo?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            user_email : email,
            user_sex : sex,
            user_phone : phone,
            user_birthday : birthday,
            user_avatar : avatar
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 用户密码修改
     * @param {Object} token 必填 用户登录状态值
     * @param {Object} oldPwd 必填  原密码
     * @param {Object} newPwd 必填  新密码
     * @param {Object} newPwdCfm 必填 确认密码（新密码）
     */
    app.changePwd = function(token, oldPwd, newPwd, newPwdCfm) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/saveUserPasswd?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            old_user_password : oldPwd,
            user_password : newPwd,
            user_com_passwd : newPwdCfm
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    
    
    /**
     * 收藏商品 
     */
    app.addFarvirateGoods = function(classId,goodsId,token, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/addGoodsFavorites?apikey=' + app.apiKey,
        data : {
          values : {
            class_id : classId,
            goods_id : goodsId,
            user_token : token
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    
    
    /**
     * 我的收藏（商品收藏列表）
     * @param {Object} token 必填 用户登录唯一标识
     * @param {Object} page   必填  调取页数，如果不填写默认是 1
     * @param {Object} qty  必填  每页显示的商品数量，如果不填写默认是 10
     * @param {Object} callback
     */
    app.getFarvirateGoods = function(token, callback, page, qty) {
      __loadding();
      
      page = parseInt(page);
      qty = parseInt(qty);
      
      page = isNaN(page) ? app.defPage : page;
      qty  = isNaN(qty) ? app.maxSize : qty;
      
      api.ajax({
        url : app.apiCtx + '/favoritesGoods?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            page : page,
            qty : qty
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     *删除收藏商品
     * @param {Object} token 必填 用户登录状态值
     * @param {Object} farvirateId 必填 商品收藏id
     * @param {Object} callback
     */
    app.delFarvirateGoods = function(token, farvirateId, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/delFavoritesGoods?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            favorites_id : farvirateId
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 我的咨询（会员中心）
     * @param {Object} token 必填 用户登录状态值
     * @param {Object} page 必填  调取页数，如果不填写默认是 1
     * @param {Object} qty 必填 每页显示的商品数量，如果不填写默认是 10
     * @param {Object} callback
     */
    app.getHomeGoodsAsk = function(token, page, qty, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/homeGoodsAsk?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            page : page,
            qty : qty
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     *  删除我的咨询
     * @param {Object} token 必填 用户登录状态值
     * @param {Object} askId 必填 商品咨询id
     * @param {Object} callback
     */
    app.delHomeGoodsAsk = function(token, askId, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/homeGoodsAskDel?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            ask_id : askId
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     *获取最新订单
     * 这里获取的订单不包括 被取消的订单 和 已经完成的订单
     *
     * @param {Object} token 必填 用户登录状态值
     * @param {Object} orderNum 非必填 获取订单数量，如果不填写，默认是5
     * @param {Object} callback
     */
    app.getNewOrder = function(token, orderNum, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/newOrder?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            order_num : orderNum
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 订单列表
     * @param {Object} token 必填 用户登录状态值
     * @param {Object} page 必填  调取页数，如果不填写默认是 1
     * @param {Object} qty  必填  每页显示的商品数量，如果不填写默认是 10
     * @param {Object} orderState 非必填 默认是全部订单（0 已取消，10 待付款[有效订单]，15 付款中，20 已付款， 30 待发货，40 已发货，60 已完成）
     * @param {Object} orderSn 非必填  订单编号，用于订单检索
     * @param {Object} callback
     */
    app.orderList = function(token, page, qty, orderState, orderSn, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/orderList?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            page : page,
            qty : qty,
            order_state : orderState,
            order_sn : orderSn
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 订单详情
     * @param {Object} token 必填 用户登录状态值
     * @param {Object} orderId 必填 订单id
     * @param {Object} callback
     */
    app.orderDetail = function(token, orderId, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/showOrder?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            order_id : orderId
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 取消订单
     * @param {Object} token 必填 用户登录状态值
     * @param {Object} orderId  必填  订单id
     * @param {Object} callback
     */
    app.cancelOrder = function(token, orderId, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/cancelOrder?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            order_id : orderId
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 删除订单
     * @param {Object} token  必填  用户登录状态值
     * @param {Object} orderId 必填 订单id
     * @param {Object} callback
     */
    app.delOrder = function(token, orderId, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/delOrder?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            order_id : orderId
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 订单完成付款
     * 付款操作在第三方（手机）进行处理，这里只接收付款成的信息。
     * @param {Object} token  必填  用户登录状态值
     * @param {Object} orderId 必填 订单id
     * @param {Object} tradeNo 非必填  只有外面支付有trade_no（外部订单号）时，并且传递过来，才会使用
     * @param {Object} stateInfo 非必填  支付凭证，只有在支付方式是 线下支付 的时候，才会有此内容的提交

     * @param {Object} callback
     */
    app.finishOrder = function(token, orderId, tradeNo, stateInfo, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/orderPayFinish?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            order_id : orderId,
            trade_no : tradeNo,
            state_info : stateInfo
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 订单确认收货
     * @param {Object} token 必填 用户登录状态值
     * @param {Object} orderId 必填 订单id
     * @param {Object} callback
     */
    app.receiptOrder = function(token, orderId, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/orderReceipt?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            order_id : orderId
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    /**
     * 获取支付方式信息
     * @param {Object} token 必填 用户登录状态值
     * @param {Object} paymentCode 必填 支付方式的标识字符串（支付方式里的 editaction 值）
     * @param {Object} callback
     */
    app.getPaymentInfo = function(token, paymentCode, callback) {
      __loadding();
      api.ajax({
        url : app.apiCtx + '/paymentInfo?apikey=' + app.apiKey,
        data : {
          values : {
            user_token : token,
            payment_code : paymentCode
          }
        }
      }, function(ret, err) {
        __hideLoadding();
        __doCallback(callback, ret, err);
      });
    }
    
    
    
    function __doCallback(callback, ret, err) {
      //console.log(api.debug);
      if (api.debug) {
        //alert(JSON.stringify(ret));
        console.log('ret : ' + typeof (ret) + ', ' + JSON.stringify(ret));
        console.log('err : ' + typeof (err) + ', ' + JSON.stringify(err));
      }

      if ( typeof (callback) == 'function') {
        if (ret && typeof (ret) == 'object') {
          callback(ret);
        } else {
          callback(err);
        }
      }
    }


    function __loadding() {
      if (app.showLoadding) {
        api.showProgress({
          title : '努力处理中...',
          text : '先喝杯茶...',
          modal : false
        });
      }
    }

    function __hideLoadding() {
      if (app.showLoadding) api.hideProgress();
    }



    window.$shop = app;
  }(window))