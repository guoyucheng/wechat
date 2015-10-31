'use strict';

var xml2js = require('xml2js');
var crypto = require('crypto');
var WXBizMsgCrypt = require('wechat-crypto');
var url = require("url");
var settings = require('settings');

var message_handler = require('./message_handler');

var compone_appid = 'wxzzzzzz';
var message_pipeline = function(request, response, next) {
	if (!(this instanceof message_pipeline)) {
		return new message_pipeline(request, response, next);
	}
	this.setToken(request);
	this.request = request;
	this.response = response;
	this.next = next;
	this.handlers = []
	//this.load_handlers(settings.MESSAGE_HANLERS)
};

message_pipeline.prototype.load_handlers = function(message_handlers) {
	var response_result = '';
	var message = this.member_handler.message;
	for (var i = 0; i < message_handlers.length; ++i) {
	    var handlerPath = message_handlers[i].replace(/\./g, '/');
	    var handler = require(handlerPath);
	    console.log(handlerPath,'====================',handler)
	    response_result = handler['handler_message'](message);
	    this.handlers.push(handler);
	    console.log('load handler:', handlerPath, response_result)
	    // debug('load middleware %s success!', middlewarePath);
	  }
}



message_pipeline.prototype.setToken = function(request) {
	this.member_handler = new message_handler(request);
	var appid = request.originalUrl.split('/')[3]
	//this.appid = url.parse(request.url).pathname;
	this.appid = appid
	console.log(request.originalUrl,'>>>>>>>>>>>>>>>>>appid:', this.appid)
}

message_pipeline.prototype.middleware = function () {
	var handlers = this.handlers;
	var message = this.member_handler.message;
	var message_handlers = settings.MESSAGE_HANLERS;
	var response_result = '';
	for (var i = 0; i < message_handlers.length; ++i) {
		var pos = message_handlers[i].lastIndexOf('.');
		var func = message_handlers[i].substring(pos+1);

	    var handlerPath = message_handlers[i].replace(/\./g, '/');
	    var handler = require(handlerPath);
	    console.log(handlerPath,'====================',func)
	    response_result = handler['subcribe_handler'](message);
	    // debug('load middleware %s success!', middlewarePath);
	  }
	console.log('===========================222222>', response_result)
	this.response.send(response_result)
}

module.exports = message_pipeline;