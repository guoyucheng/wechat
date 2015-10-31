var xml2js = require('xml2js');
var crypto = require('crypto');
var WXBizMsgCrypt = require('wechat-crypto');
var getRawBody = require('raw-body');



var parseXML = function (xml) {
  return function (done) {
    xml2js.parseString(xml, {trim: true}, done);
  };
};

/*!
 * 将xml2js解析出来rq的对象转换成直接可访问的对象
 */
var formatMessage = function (result) {
  var message = {};
  if (typeof result === 'object') {
    for (var key in result) {
      if (!(result[key] instanceof Array) || result[key].length === 0) {
        continue;
      }
      if (result[key].length === 1) {
        var val = result[key][0];
        if (typeof val === 'object') {
          message[key] = formatMessage(val);
        } else {
          message[key] = (val || '').trim();
        }
      } else {
        message[key] = [];
        result[key].forEach(function (item) {
          message[key].push(formatMessage(item));
        });
      }
    }
  }
  return message;
};

/*
 * xml to obj
 */
var get_message = function(body_message){
  var extractedData = "";
  var parser = new xml2js.Parser();
  parser.parseString(body_message, function(err,result){
    //Extract the value from the data element
    extractedData = result;
    console.log(extractedData['xml']);
  });

  var formated = formatMessage(extractedData['xml'])
  console.log('>>>>>>message_obj：', formated)
  return formated
}

/*
 * 支持测试
 */
var get_raw_message = function(reqest){
  if (reqest.GET.weizoom_message == '1') {
      return reqest.body['weizoom_message'];
  } else {
      return reqest.body;
  }
}


/*
 * 消息handler
 */
var message_handler = function (reqest) {
	if (!(this instanceof message_handler)) {
		return new message_handler(reqest)
	}

	console.log('>>>>>>>>GET:',reqest.GET);
  var body_message = get_raw_message(reqest); //reqest.body['weizoom_message']
  console.log('>>>>>>>>body_message:',body_message)
  this.weixin_xml = body_message;
  this.message = get_message(body_message)
}

module.exports = message_handler;