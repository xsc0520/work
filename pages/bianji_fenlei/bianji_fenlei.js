// pages/bianji_fenlei/bianji_fenlei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkbox: [
       '早安','晚安'
    ],
    baocun:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  insert:function(){
    var cb = this.data.checkbox;
    cb.push(this.data.checkbox.length);
    this.setData({
      checkbox: cb
    });
  },
  showToast:function(){

    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    })
  },
  shanchu:function(e){
    // var i = e.currentTarget.dataset.index;
    var that=this;
    var i =e.currentTarget.dataset.index;
    console.log(i)
    that.data.checkbox.splice(i,1)
    var array = that.data.checkbox
    that.setData({
      checkbox:array
    })
  },

})
