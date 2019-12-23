//app.js
App({
      onLaunch: function() {

        if (!wx.cloud) {
          console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
          wx.cloud.init({
            // env 参数说明：
            //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
            //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
            //   如不填则使用默认环境（第一个创建的环境）
            // env: 'my-env-id',
            traceUser: true,
          })
        }

        this.globalData = {}

        wx.cloud.callFunction({
          name: 'login',
          data: {},
          success: res => {
            console.log('[云函数] [login] user openid: ', res.result.openid)
            this.globalData.openid = res.result.openid
          },
          fail: err => {

          }
        })

        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        let _this = this.globalData;
        db.collection('counters').where({
          _openid: this.globalData.openid
        }).get({
            success: res => {
              if (res.data.length == 0) {
                db.collection('counters').add({
                    data: {
                      count: 1,
                      color: [{
                          "color": "#ff4e18ff",
                          "name": "橙色",
                          "white": 100
                        }, {
                          "color": "#f0ff0dff",
                          "name": "黄色",
                          "white": 100
                        },
                        {
                          "color": "#3c3cffff",
                          "name": "蓝色",
                          "white": 100
                        },
                        {
                          "color": "#00ff1fff",
                          "name": "绿色",
                          "white": 100
                        }
                      ]},
                      success: res => {
                        _this._id = res._id
                        console.log(_this)
                        wx.showToast({
                          title: '新增记录成功',
                        })
                        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
                      },
                      fail: err => {
                        wx.showToast({
                          icon: 'none',
                          title: '新增用户失败'
                        })
                        console.error('[数据库] [新增记录] 失败：', err)
                      }
                    })
                }
              },
              fail: err => {
                wx.showToast({
                  icon: 'none',
                  title: '查询记录失败'
                })
                console.error('[数据库] [查询记录] 失败：', err)
              }
            })
        }
      })