# 微信小程序 云开发 
前端工程师通过微信小程序的云开发操作数据库：
- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码
第一步新建云开发的配置环境，就会有自己的数据库，存储空间，和云函数，云函数基于node.js;
在数据库里创建一张表，就可以记录用户数据了。
微信用户进入微信小程序，根据用户的openid创建一条数据，然后这个人就可以根据自己的喜好对数据增删改查。
## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

