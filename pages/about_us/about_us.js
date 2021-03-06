// pages/about_us/about_us.js

var app = getApp();
// 手机的宽度
var windowWRPX = 750
// 拖动时候的 pageX
var pageX = 0
// 拖动时候的 pageY
var pageY = 0

var pixelRatio = wx.getSystemInfoSync().pixelRatio

// 调整大小时候的 pageX
var sizeConfPageX = 0
// 调整大小时候的 pageY
var sizeConfPageY = 0

var initDragCutW = 0
var initDragCutL = 0
var initDragCutH = 0
var initDragCutT = 0
var qualityWidth = 750
var innerAspectRadio = 1
// 移动时 手势位移与 实际元素位移的比
var dragScaleP = 2
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sctishi:'上传',
    imageList: [
      'http://weixin.forindata.com/pushInfo/sucai/getsucai.action?fileName=houtia_XCX/pig_jia.png'
    ],
    img_show: true,
    shop: ['1'],  //门店个数
    img_show: true,
    video_src: null,
    returnImage: '',
    isShowImg: false,
    // 初始化的宽高
    cropperInitW: windowWRPX,
    cropperInitH: windowWRPX,
    // 动态的宽高
    cropperW: windowWRPX,
    cropperH: windowWRPX,
    // 动态的left top值
    cropperL: 0,
    cropperT: 0,

    // 图片缩放值
    scaleP: 0,
    imageW: 0,
    imageH: 0,

    // 裁剪框 宽高
    cutW: 375,
    cutH: 375,
    cutL: 0,
    cutT: 0,
    qualityWidth: qualityWidth,
    innerAspectRadio: innerAspectRadio,

    //设置剪裁区域是否出现1，3:代表不出现，2代表出现
    isExit: '1',

    mendian:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/tongYong/showAboutUs.do',
      data: {
        "khcode": app.globalData.khcode,

      },
      dataType: 'json',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success(e) {
        console.log(e.data);
        console.log(e.data.jingpin)
        if (e.data.beijing) {
          that.setData({
            beijing: app.globalData.sourseUrl + e.data.beijing.detail,
            // jingpin: e.data.jingpin,
            sourseurl: app.globalData.sourseUrl,
            // xiaoqu: e.data.xiaoqu
          })

        }
        

      }
    })
    that.getMendian();
   
   
    
  },
  getMendian:function(){
    var that = this;
    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/ajaxGetMendian.do',
      data: {
        "khcode": app.globalData.khcode,

      },
      dataType: 'json',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success(res) {
        console.log("mendian:", res.data);
        if (res.data.length == 0) {
          var fendian = {
            name: '',
            address: '',
            time1: '',
            phone: '',
          };
          var mendian = res.data;
          mendian.push(fendian);
          that.setData({
            mendian: mendian
          })
        } else {
          that.setData({
            mendian: res.data
          })
        }
        


      }
    })

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  chooseImage: function () {
    var that = this
    var i = that.data.imageList
    console.log(i.length)
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          imageSrc: res.tempFilePaths[0],
          isExit: '2'
        })
        that.loadImage();
      }
    })
  },
  guanbi: function () {
    this.setData({
      imageList: ['../../icons/pig_jia.png'],
      img_show: true,
    })
  },
  
  //添加门店
  add_shop: function (e) {
    var that = this;
    // that.data.shop.push(1);
    // var shop = that.data.shop;
    // that.setData({
    //   shop: shop
    // })

    var fendian = {
      name: '',
      address: '',
      time1: '',
      phone: '',
    };
    var mendian = that.data.mendian;
    mendian.push(fendian);
    that.setData({
      mendian: mendian
    })
  },
  go_url: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
 




  g: function (e) {
    // 获取 类似于for的i
    var index = e.currentTarget.dataset.index;
    var that = this;
    //that.data.imageList 或许他现有的数组
    //.splice删除 i位子的字符串
    that.data.imageList.splice(index, 1)
    var shuzu = that.data.imageList
    // 赋值给现在的数组
    that.setData({
      imageList: shuzu,
    });
  },
  loadImage: function () {
    var _this = this
    wx.showLoading({
      title: '图片加载中...',
    })
    wx.getImageInfo({
      src: _this.data.imageSrc,
      success: function success(res) {
        innerAspectRadio = res.width / res.height;  //图片宽高比
        // var cutImgRadio = 1;   //剪裁框宽高比例375/375
        // if (innerAspectRadio >= cutImgRadio) {
        //   //按照高度来裁剪
        //   var cutWidth = res.height;
        //   var cutHeight = res.height;
        // } else {
        //   //按照宽度来裁剪
        //   var cutWidth = res.width;
        //   var cutHeight = res.width;
        // }
        // 根据图片的宽高显示不同的效果   保证图片可以正常显示
        if (innerAspectRadio >= 1) {
          _this.setData({
            cropperW: windowWRPX,
            cropperH: windowWRPX / innerAspectRadio,
            // 初始化left right
            cropperL: Math.ceil((windowWRPX - windowWRPX) / 2),
            cropperT: Math.ceil((windowWRPX - windowWRPX / innerAspectRadio) / 2),
            // 裁剪框  宽高  
            // cutW: windowWRPX - 200,
            // cutH: windowWRPX / innerAspectRadio - 200,
            cutW: 750 / innerAspectRadio,
            cutH: 750 / innerAspectRadio,
            cutL: Math.ceil((windowWRPX - windowWRPX + 200) / 2),
            cutT: Math.ceil((windowWRPX / innerAspectRadio - (windowWRPX / innerAspectRadio - 200)) / 2),
            // 图片缩放值
            scaleP: res.width * pixelRatio / windowWRPX,
            // 图片原始宽度 rpx
            imageW: res.width * pixelRatio,
            imageH: res.height * pixelRatio,

            innerAspectRadio: innerAspectRadio
          })
        } else {
          _this.setData({
            cropperW: windowWRPX * innerAspectRadio,
            cropperH: windowWRPX,
            // 初始化left right
            cropperL: Math.ceil((windowWRPX - windowWRPX * innerAspectRadio) / 2),
            cropperT: Math.ceil((windowWRPX - windowWRPX) / 2),
            // 裁剪框的宽高
            cutW: 750 * innerAspectRadio,
            cutH: 750 * innerAspectRadio,
            cutL: Math.ceil((windowWRPX * innerAspectRadio - (windowWRPX * innerAspectRadio - 50)) / 2),
            cutT: Math.ceil((windowWRPX - 200) / 2),
            // 图片缩放值
            scaleP: res.width * pixelRatio / windowWRPX,
            // 图片原始宽度 rpx
            imageW: res.width * pixelRatio,
            imageH: res.height * pixelRatio,

            innerAspectRadio: innerAspectRadio
          })
        }
        _this.setData({
          isShowImg: true
        })
        wx.hideLoading()
      }
    })
  },
  // 设置大小的时候触发的touchStart事件
  dragStart(e) {
    var _this = this
    sizeConfPageX = e.touches[0].pageX
    sizeConfPageY = e.touches[0].pageY
    initDragCutW = _this.data.cutW
    initDragCutL = _this.data.cutL
    initDragCutT = _this.data.cutT
    initDragCutH = _this.data.cutH
  },

  // 设置大小的时候触发的touchMove事件
  dragMove(e) {
    var _this = this;
    var dragLengthX = (sizeConfPageX - e.touches[0].pageX) * dragScaleP
    var dragLengthY = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
    if (initDragCutH >= dragLengthY && initDragCutW >= dragLengthX) {
      if ((dragLengthY < 0 && _this.data.cropperH > initDragCutT + _this.data.cutH) || (dragLengthY > 0)) {
        this.setData({
          cutH: initDragCutH - dragLengthY,
          cutW: (initDragCutH - dragLengthY)
        })
      } else if ((dragLengthX < 0 && _this.data.cropperW > initDragCutL + _this.data.cutW) || (dragLengthX > 0)) {
        this.setData({
          cutW: initDragCutW - dragLengthX,
          cutH: (initDragCutW - dragLengthX)
        })
      } else {
        return
      }
    }
  },
  // 拖动时候触发的touchStart事件
  contentStartMove(e) {
    pageX = e.touches[0].pageX
    pageY = e.touches[0].pageY
  },
  // 拖动时候触发的touchMove事件
  contentMoveing(e) {
    var _this = this
    // _this.data.cutL + (e.touches[0].pageX - pageX)
    // console.log(e.touches[0].pageX)
    // console.log(e.touches[0].pageX - pageX)
    var dragLengthX = (pageX - e.touches[0].pageX) * dragScaleP
    var dragLengthY = (pageY - e.touches[0].pageY) * dragScaleP
    var minX = Math.max(_this.data.cutL - (dragLengthX), 0)
    var minY = Math.max(_this.data.cutT - (dragLengthY), 0)
    var maxX = _this.data.cropperW - _this.data.cutW
    var maxY = _this.data.cropperH - _this.data.cutH
    this.setData({
      cutL: Math.min(maxX, minX),
      cutT: Math.min(maxY, minY),
    })
    console.log(`${maxX} ----- ${minX}`)
    pageX = e.touches[0].pageX
    pageY = e.touches[0].pageY
  },

  // 获取图片
  getImageInfo() {
    var _this = this
    wx.showLoading({
      title: '图片生成中...',
    })
    // 将图片写入画布
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.drawImage(_this.data.imageSrc, 0, 0, qualityWidth, qualityWidth / innerAspectRadio);
    ctx.draw(true, () => {
      // 获取画布要裁剪的位置和宽度   均为百分比 * 画布中图片的宽度    保证了在微信小程序中裁剪的图片模糊  位置不对的问题 canvasT = (_this.data.cutT / _this.data.cropperH) * (_this.data.imageH / pixelRatio)
      var canvasW = (_this.data.cutW / _this.data.cropperW) * qualityWidth
      var canvasH = (_this.data.cutH / _this.data.cropperH) * qualityWidth / innerAspectRadio
      var canvasL = (_this.data.cutL / _this.data.cropperW) * qualityWidth
      var canvasT = (_this.data.cutT / _this.data.cropperH) * qualityWidth / innerAspectRadio
      console.log(`canvasW:${canvasW} --- canvasH: ${canvasH} --- canvasL: ${canvasL} --- canvasT: ${canvasT} -------- _this.data.imageW: ${_this.data.imageW}  ------- _this.data.imageH: ${_this.data.imageH} ---- pixelRatio ${pixelRatio}`)
      wx.canvasToTempFilePath({
        x: canvasL,
        y: canvasT,
        width: canvasW,
        height: canvasH,
        destWidth: canvasW,
        destHeight: canvasH,
        quality: 0.5,
        canvasId: 'myCanvas',
        success: function (res) {
          wx.hideLoading()
          console.log(res.tempFilePath);
          _this.data.imageList.splice(0, 1)
          _this.data.imageList.push(res.tempFilePath);

          var imageList = _this.data.imageList
          _this.setData({
            isExit: '3',
            imageList: imageList,
            img_show: false,
          })
          // 成功获得地址的地方
          console.log(res.tempFilePath);
          _this.goSave(res.tempFilePath);
          _this.setData({
            sctishi:'更换'
          })

        }
      })
    })
  },

    goSave: function(path) {
      var that = this;
      wx.showLoading({
        title: '上传图片中',
      })
      wx.uploadFile({
        url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/uploadPhtot.do',
        filePath: path,
        name: 'file',
        success: function (res) {
          console.log(res);
          //开始保存数据
          // var that = this;
          wx.request({
            url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/addOrUpdateBeijing.do',
            data: {
              "khcode": app.globalData.khcode,

              "detail": res.data,

            },
            dataType: 'json',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'post',
            success(e) {
              console.log(e.data);
              wx.hideLoading();
              wx.request({
                url: app.globalData.myUrl2 + 'minisoftware/tongYong/showAboutUs.do',
                data: {
                  "khcode": app.globalData.khcode,

                },
                dataType: 'json',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                method: 'post',
                success(e) {
                  console.log(e.data);
                  console.log(e.data.jingpin)
                  if (e.data.beijing) {
                    that.setData({
                      beijing: app.globalData.sourseUrl + e.data.beijing.detail,
                      // jingpin: e.data.jingpin,
                      sourseurl: app.globalData.sourseUrl,
                      // xiaoqu: e.data.xiaoqu
                    })

                  }

                }
              })

            }
          })



        }
      })
    },

  getnone: function (e) {
    this.setData({
      isExit: '1'
    })
  },
  Close: function (e) {
    var index = e.currentTarget.dataset.index;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除图片?',
      success: function (res) {
        if (res.confirm) {
          // 获取 类似于for的i

          //that.data.imageList 或许他现有的数组
          //.splice删除 i位子的字符串
          that.data.imageList.splice(index, 1)
          var shuzu = that.data.imageList
          // 赋值给现在的数组
          that.setData({
            imageList: shuzu,
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  inputName:function(e){
    var that = this;
    var mendian = that.data.mendian;
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    mendian[index].name=e.detail.value;
    that.data.mendian = mendian;
    console.log(mendian);
    
  },

  inputAddress:function(e){
    var that = this;
    var mendian = that.data.mendian;
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    mendian[index].address = e.detail.value;
    that.data.mendian = mendian;
    console.log(mendian);
  },
  inputTime1: function (e) {
    var that = this;
    var mendian = that.data.mendian;
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    mendian[index].time1 = e.detail.value;
    that.data.mendian = mendian;
    console.log(mendian);
  },
  inputPhone: function (e) {
    var that = this;
    var mendian = that.data.mendian;
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    mendian[index].phone = e.detail.value;
    that.data.mendian = mendian;
    console.log(mendian);
  },

  baocun: function (e) {
    wx.showLoading({
      title: '保存中',
    })
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    console.log(index);
    console.log(id);
    if(id==undefined){
      id=0;
      console.log("去增加");
    }else{
      console.log("去更新");
    }
    console.log(that.data.mendian[index]);

    wx.request({
      url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/ajaxSaveMendian.do',
      data: {
        "id": id,
        "khcode": app.globalData.khcode,
        "mdname": that.data.mendian[index].name,
        "mdaddress": that.data.mendian[index].address,
        "time1": that.data.mendian[index].time1,
        "phone": that.data.mendian[index].phone,
      },
      dataType: 'json',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success(e) {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '保存成功',
          showCancel: false,//是否显示取消按钮
          
          
        })
        console.log(e.data);
        that.getMendian();


      }
    })


    

  },
  //删除门店
  delete_shop: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除校区信息吗？',
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          var index = e.currentTarget.dataset.index;
          var id = e.currentTarget.dataset.id;
          that.data.mendian.splice(index, 1);
          var mendian = that.data.mendian;
          that.setData({
            mendian: mendian
          })
          if (id !== undefined) {
            //去数据库中按id更新为删除状态
            wx.request({
              url: app.globalData.myUrl2 + 'minisoftware/tyHouTai/ajaxUpdateMendian.do',
              data: {
                "id": id,
                "state": -1
              },
              dataType: 'json',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              method: 'post',
              success(e) {
                console.log(e.data);

                that.getMendian();
              }
            })
          }
        }
      },
    })
    
  },
})