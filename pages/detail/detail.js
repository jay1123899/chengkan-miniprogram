const { spots } = require('../../data/spots.js')
const store = require('../../utils/store.js')

Page({
  data: {
    spot: null,
    fav: false,
    gallery: [] // 详情页图集
  },

  onLoad(options) {
    const id = options && options.id
    const found = spots.filter(function (s) {
      return s.id === id
    })[0]

    if (!found) {
      wx.showToast({ title: '景点不存在', icon: 'none' })
      return
    }

    // 图集：优先用 images 数组，没有则退回单张 image，都没有则空
    let gallery = []
    if (found.images && found.images.length) {
      gallery = found.images
    } else if (found.image) {
      gallery = [found.image]
    }

    this.setData({
      spot: Object.assign({}, found, { first: found.name.charAt(0) }),
      fav: store.isFavorite(found.id),
      gallery: gallery
    })
    wx.setNavigationBarTitle({ title: found.name })
  },

  // 图集里某张图加载失败（文件还没放进来）就把它移出数组；全部失败时自动退回占位块
  onHeroImgError(e) {
    const idx = e.currentTarget.dataset.idx
    const gallery = this.data.gallery.slice()
    gallery.splice(idx, 1)
    this.setData({ gallery: gallery })
  },

  // 点击图片放大查看（可左右滑动浏览图集）
  onPreview(e) {
    const gallery = this.data.gallery
    if (!gallery || !gallery.length) return
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: gallery
    })
  },

  onToggleFav() {
    if (!this.data.spot) return
    const fav = store.toggleFavorite(this.data.spot.id)
    this.setData({ fav: fav })
    wx.showToast({ title: fav ? '已收藏' : '已取消收藏', icon: 'none' })
  },


  onShareAppMessage() {
    const spot = this.data.spot
    return {
      title: spot ? spot.name + ' · 呈坎古村' : '呈坎古村',
      path: '/pages/detail/detail?id=' + (spot ? spot.id : '')
    }
  }
})
