/*!
 * wechat
 *
 * Copyright(C) 2012-2015 Weizoom, Inc.
 * MIT Licensed
 */

'use strict';

var path = require('path');

//用于session加密的token串
exports.SECRET = 'weizoom_wechat';

//mongodb连接信息
exports.MONGO = 'mongodb://127.0.0.1/wechat';

//redis连接信息
exports.MONGO = '';

//RequectContext使用的processor
exports.MESSAGE_HANLERS = [
	'lib.message.handler.subscribe_handler'
]

//seig filters
exports.FILTERS = [
	// setting filter like 'lib.filters'
]

//connect中间件
exports.MIDDLEWARES = [
	'lib.middleware.auth'
]

//是否开启CORS支持
exports.ENABLE_CORS = true;

//API Server支持
exports.API_HOSTS = {
	"api.wechat.com": true, 
	"127.0.0.1:3000": true
}

exports.MONGO_ERROR_HANDLER = function(err) { return next(err); };

//项目相关目录
exports.PROJECT_HOME = __dirname; //home目录
//exports.UPLOAD_DIR = path.join(__dirname, 'static/upload'); //上传图片目录