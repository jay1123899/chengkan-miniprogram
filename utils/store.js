/**
 * 收藏数据管理：基于小程序本地缓存（wx.setStorageSync）
 * 存的是景点 id 数组，例如 ['baolunge', 'yongxinghu']
 */
const KEY = 'ck_favorites'

function getFavorites() {
  return wx.getStorageSync(KEY) || []
}

function isFavorite(id) {
  return getFavorites().indexOf(id) > -1
}

// 返回切换后的收藏状态
function toggleFavorite(id) {
  const list = getFavorites()
  const idx = list.indexOf(id)
  if (idx > -1) {
    list.splice(idx, 1)
  } else {
    list.push(id)
  }
  wx.setStorageSync(KEY, list)
  return idx === -1
}

function removeFavorite(id) {
  const list = getFavorites().filter(item => item !== id)
  wx.setStorageSync(KEY, list)
  return list
}

module.exports = {
  getFavorites,
  isFavorite,
  toggleFavorite,
  removeFavorite
}
