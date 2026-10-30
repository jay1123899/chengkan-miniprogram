const { spots, categories } = require('../../data/spots.js')
const store = require('../../utils/store.js')

Page({
  data: {
    keyword: '',
    category: '全部',
    categories: categories,
    list: []
  },

  onLoad(options) {
    if (options && options.keyword) {
      this.setData({ keyword: decodeURIComponent(options.keyword) })
    }
  },

  onShow() {
    // 同步自定义 tabBar 的选中态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
    // 接收首页搜索关键词（tabBar 页面不能带参数，走全局变量）
    const app = getApp()
    if (app.globalData.searchKeyword) {
      this.setData({ keyword: app.globalData.searchKeyword })
      app.globalData.searchKeyword = ''
    }
    this.apply()
  },

  onInput(e) {
    this.setData({ keyword: e.detail.value })
  },

  onSearch() {
    this.apply()
  },

  onClear() {
    this.setData({ keyword: '' })
    this.apply()
  },

  onCat(e) {
    this.setData({ category: e.currentTarget.dataset.cat })
    this.apply()
  },

  apply() {
    const kw = this.data.keyword.trim()
    const cat = this.data.category
    const list = spots
      .filter(function (s) {
        return cat === '全部' || s.category === cat
      })
      .filter(function (s) {
        if (!kw) return true
        // 匹配范围：名称、一句话简介、看点、正文段落、标签
        const haystack = [
          s.name,
          s.summary,
          s.tags.join(''),
          s.highlights.join(''),
          s.desc.join('')
        ].join('')
        return haystack.indexOf(kw) > -1
      })
      .map(function (s) {
        return Object.assign({}, s, {
          first: s.name.charAt(0),
          fav: store.isFavorite(s.id)
        })
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
  }
})
