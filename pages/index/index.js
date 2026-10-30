const { spots } = require('../../data/spots.js')
const { banners } = require('../../data/banners.js')
const store = require('../../utils/store.js')

Page({
  data: {
    banners: banners,
    hot: []
  },

  onLoad() {
    this.buildHot()
  },

  onShow() {
    // 同步自定义 tabBar 的选中态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
    this.buildHot()
  },

  buildHot() {
    const hot = spots.slice(0, 3).map(function (s) {
      return Object.assign({}, s, {
        first: s.name.charAt(0),
        fav: store.isFavorite(s.id)
      })
    })
    this.setData({ hot: hot })
  },

  // 点击轮播图：跳转到对应景点详情
  onBannerTap(e) {
    const spotId = e.currentTarget.dataset.id
    if (!spotId) return
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + spotId
    })
  },

  goList() {
    wx.switchTab({ url: '/pages/spots/spots' })
  },

  goDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id
    })
  },

  // 图片还没放进来时加载会失败，这里清空该条路径，页面自动退回渐变占位块
  onBannerImgError(e) {
    const idx = e.currentTarget.dataset.idx
    this.setData({ ['banners[' + idx + '].image']: '' })
  },

  onThumbImgError(e) {
    const idx = e.currentTarget.dataset.idx
    this.setData({ ['hot[' + idx + '].image']: '' })
  },

  onShareAppMessage() {
    return {
      title: '呈坎古村 · 景点介绍',
      path: '/pages/index/index'
    }
  }
})
