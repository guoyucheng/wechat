#-*- encoding: utf-8 -*-
import httplib
import time
import urllib


body = '<xml><ToUserName><![CDATA[gh_2d34b5bae18e]]></ToUserName> <FromUserName><![CDATA[oTWHSjkQI1INr2zs7ho7Z689POZ0]]></FromUserName> <CreateTime>1446124279</CreateTime> <MsgType><![CDATA[event]]></MsgType> <Event><![CDATA[unsubscribe]]></Event> <EventKey><![CDATA[]]></EventKey> </xml>'
conn = httplib.HTTPConnection("localhost", "3000", False, 600)
url = '/weixin/appid/ssssssss'
conn.request('POST', url = url, body = body) 
#如果需要带headers，则可先声明
#headers = {'X-BDYY' : '123456'} 
  #conn.request('POST',url = url, body = body, headers=headers) 
#key = response.getheader("x-bdyy")      
response = conn.getresponse()
print response.read()