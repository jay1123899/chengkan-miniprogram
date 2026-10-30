Component({
  data: {
    selected: 0,
    color: '#9aa5a3',
    selectedColor: '#46605f',
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        iconPath: '/images/tab-home.png',
        selectedIconPath: '/images/tab-home-active.png'
      },
      {
        pagePath: '/pages/spots/spots',
        text: '景点',
        iconPath: '/images/tab-spot.png',
        selectedIconPath: '/images/tab-spot-active.png'
      },
      {
        pagePath: '/pages/favorite/favorite',
        text: '收藏',
        iconPath: '/images/tab-fav.png',
        selectedIconPath: '/images/tab-fav-active.png'
      },
      {
        pagePath: '/pages/about/about',
        text: '关于',
        iconPath: '/images/tab-about.png',
        selectedIconPath: '/images/tab-about-active.png'
      }
    ]
  },

  methods: {
    switchTab(e) {
      const index = e.currentTarget.dataset.index
      const path = e.currentTarget.dataset.path
      // 已经在当前页就不重复跳转
      if (index === this.data.selected) return
      wx.switchTab({ url: path })
      this.setData({ selected: index })
    }
  }
})
