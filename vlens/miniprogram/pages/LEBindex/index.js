//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onLoad: function() {
    wx.getStorage({
      key: 'deviceId',
      success(data) {
        wx.stopBluetoothDevicesDiscovery({
          success: function (res) {
            console.log('停止搜索设备', res)
          }
        })
        let name = '';
        wx.getStorage({
          key: 'deviceName',
          success(res) {
            console.log(res.data)
            name = res.data
          }
        })
        var title = data.data;
       
        wx.navigateTo({
          url: '../detail/detail?id=' + title + '&name=' + name
        })
      }
    })

    var that = this
    /* 初始化蓝牙适配器 */
    wx.openBluetoothAdapter({
      success: function(res) {
        console.log('初始化蓝牙适配器成功');
        wx.startBluetoothDevicesDiscovery({
          services: [],
          allowDuplicatesKey: false,
          success: function(res) {
            console.log('这里是开始搜索附近设备', res);
            wx.onBluetoothDeviceFound(function(res) {
              console.log("成功", res);


              /* 获取设备信号，判断信号强度 */
              var device_RSSI_1 = res.devices[0].RSSI;
              var device_RSSI_2 = Number(device_RSSI_1);
              var device_RSSI = Math.abs(device_RSSI_2);


              if (device_RSSI <= 60) {

                var img = "../../images/signal4.png"

              } else if (device_RSSI > 60 && device_RSSI <= 70) {
                var img = "../../images/signal3.png"

              } else if (device_RSSI > 70 && device_RSSI <= 80) {

                var img = "../../images/signal2.png"

              } else if (device_RSSI > 80) {

                var img = "../../images/signal1.png"

              }

              if (res.devices[0].name == "") {
                var temp = {
                  ID: res.devices[0].deviceId,
                  name: "Unknow device",
                  RSSI: res.devices[0].RSSI,
                  img: img
                }
              } else {
                var temp = {
                  ID: res.devices[0].deviceId,
                  name: res.devices[0].name,
                  RSSI: res.devices[0].RSSI,
                  img: img
                }
              }

              device.push(temp);
              that.setData({
                device: device
              });
              that.group(that.data.device, 'ID')
            });
          },
        });
      },
    })
  },
  onShow: function() {
    var that = this;
    wx.showLoading({
      title: '请打开蓝牙重新进入小程序',
    });
    var device = [];
    wx.closeBluetoothAdapter({
      success: function(res) {
        console.log('关闭蓝牙模块');
        /* 初始化蓝牙适配器 */
        wx.openBluetoothAdapter({
          success: function(res) {
            console.log('初始化蓝牙适配器成功');
            wx.hideLoading();
            wx.startBluetoothDevicesDiscovery({
              services: [],
              allowDuplicatesKey: false,
              success: function(res) {
                console.log('这里是开始搜索附近设备', res);
                wx.onBluetoothDeviceFound(function(res) {
                  console.log("成功", res);

                  /* 获取设备信号，判断信号强度 */
                  var device_RSSI_1 = res.devices[0].RSSI;
                  var device_RSSI_2 = Number(device_RSSI_1);
                  var device_RSSI = Math.abs(device_RSSI_2);
                  if (device_RSSI <= 60) {
                    var img = "../../images/signal4.png"
                  } else if (device_RSSI > 60 && device_RSSI <= 70) {
                    var img = "../../images/signal3.png"
                  } else if (device_RSSI > 70 && device_RSSI <= 80) {
                    var img = "../../images/signal2.png"
                  } else if (device_RSSI > 80) {
                    var img = "../../images/signal1.png"
                  }

                  if (res.devices[0].name == "") {
                    var temp = {
                      ID: res.devices[0].deviceId,
                      name: "Unknow device",
                      RSSI: res.devices[0].RSSI,
                      img: img
                    }
                  } else {
                    var temp = {
                      ID: res.devices[0].deviceId,
                      name: res.devices[0].name,
                      RSSI: res.devices[0].RSSI,
                      img: img
                    }
                  }
                  device.push(temp);
                  that.setData({
                    device: device
                  });
                  that.group(that.data.device, 'ID')
                });
              },
            });
          },
        })

      }
    });
  },
  /* 下拉刷新页面 */
  onPullDownRefresh: function(event) {
    var that = this;
    console.log('开始下拉刷新事件');
    wx.startPullDownRefresh()
    wx.showNavigationBarLoading(); //加载动画开始
    that.again_search();
  },
  again_search: function() {
    var that = this;
    var device = [];
    wx.closeBluetoothAdapter({
      success: function(res) {
        console.log('关闭蓝牙模块')
      }
    });
    /* 初始化蓝牙适配器 */
    wx.openBluetoothAdapter({
      success: function(res) {
        console.log('初始化蓝牙适配器成功');
        wx.startBluetoothDevicesDiscovery({
          services: [],
          allowDuplicatesKey: false,
          success: function(res) {
            console.log('这里是开始搜索附近设备', res);
            wx.onBluetoothDeviceFound(function(res) {
              console.log("成功", res);
              wx.hideNavigationBarLoading(); //加载动画结束
              wx.stopPullDownRefresh(); //停止当前页面的下拉刷新


              /* 获取设备信号，判断信号强度 */
              var device_RSSI_1 = res.devices[0].RSSI;
              var device_RSSI_2 = Number(device_RSSI_1);
              var device_RSSI = Math.abs(device_RSSI_2);
              if (device_RSSI <= 60) {

                var img = "../../images/signal4.png"

              } else if (device_RSSI > 60 && device_RSSI <= 70) {
                var img = "../../images/signal3.png"

              } else if (device_RSSI > 70 && device_RSSI <= 80) {

                var img = "../../images/signal2.png"

              } else if (device_RSSI > 80) {

                var img = "../../images/signal1.png"

              }
              if (res.devices[0].name == "") {
                var temp = {
                  ID: res.devices[0].deviceId,
                  name: "Unknow device",
                  RSSI: res.devices[0].RSSI,
                  img: img
                }
              } else {
                var temp = {
                  ID: res.devices[0].deviceId,
                  name: res.devices[0].name,
                  RSSI: res.devices[0].RSSI,
                  img: img
                }
              }
              device.push(temp);
              that.setData({
                device: device
              });
              that.group(that.data.device, 'ID')
            });
          },
        });
      },
    })
  },
  /* 去重 */
  group: function(data, key) {
    var that = this;
    var obj = {},
      arr = [];
    for (var a = 0; a < data.length; a++) {
      if (!obj[data[a][key]]) {
        obj[data[a][key]] = [data[a]];
        arr.push(data[a]);
        that.setData({
          deviceArray: arr
        });
      } else {
        obj[data[a][key]].push(data[a]);
      }
    }
  },
  /* 点击事件 */
  onLianTap: function(event) {
    wx.stopBluetoothDevicesDiscovery({
      success: function(res) {
        console.log('停止搜索设备', res)
      }
    })
    var title = event.currentTarget.dataset.deviceid;
    var name = event.currentTarget.dataset.devicename;
    wx.navigateTo({
      url: '../detail/detail?id=' + title + '&name=' + name
    })
  },
})