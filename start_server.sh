export NODE_PATH=$NODE_PATH:.
echo $NODE_PATH
export DEBUG=wechat:*,core,core:*,method*,codehouse:*,-not_this
npm start
