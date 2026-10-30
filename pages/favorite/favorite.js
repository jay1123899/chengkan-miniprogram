const { spots } = require('../../data/spots.js')
const store = require('../../utils/store.js')

Page({
  data: {
    list: []
  },

  onShow() {
    // 同步自定义 tabBar 的选中态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
    this.load()
  },

  load() {
    const ids = store.getFavorites()
    const list = ids
      .map(function (id) {
        return spots.filter(function (s) {
          return s.id === id
        })[0]
      })
      .filter(function (s) {
        return !!s
      })
      .map(function (s) {
        return Object.assign({}, s, { first: s.name.charAt(0) })
      })
    this.setData({ list: list })
  },

  // 图片还没放进来时加载会失败，清空该条路径让页面退回渐变占位块
  onThumbImgError(e) {
    const idx = e.currentTarget.dataset.idx
    this.setData({ ['list[' + idx + '].image']: '' })
  },

  goDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id
    })
  },

  onRemove(e) {
    const id = e.currentTarget.dataset.id
    store.removeFavorite(id)
    this.load()
    wx.showToast({ title: '已取消收藏', icon: 'none' })
  },

  goSpots() {
    wx.switchTab({ url: '/pages/spots/spots' })
  }
})
