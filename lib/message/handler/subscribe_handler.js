
/*!
 * wechat
 *
 * Copyright(c) 2012-2015 weizoom
 * MIT Licensed
 */
var subcribe_handler = function (message) {
	if (message.MsgType == 'event') {
		if (message.Event == 'subscribe') {
			return '关注消息';
		}else if (message.Event == 'unsubscribe') {

			return '取消关注消息';
		} else {
			return  ''
		}
	}
	return ''
}

exports.subcribe_handler = subcribe_handler;