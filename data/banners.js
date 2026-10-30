/**
 * 首页轮播图配置（5 张）
 *
 * image 留空时会显示对应的青灰渐变底色 + 标题文字，不会出现破图。
 * 放入图片后，把路径填进 image，例如 '/images/banner-1.jpg'。
 * 建议尺寸：750 × 480 px（或 1080 × 720），比例 25:16，单张压到 100KB 以内。
 *
 * spotId：点击该轮播图后跳转到的景点 id，需与 data/spots.js 中的 id 一致；
 *         留空字符串则点击不跳转（适合纯宣传图）。
 *
 * bg：无图时的渐变底色，青灰系深浅变化，保证五张之间有节奏但不刺眼。
 */
const banners = [
  {
    id: 'b1',
    spotId: 'yongxinghu',
    title: '呈坎古村',
    subtitle: '徽州古村落 · 水圳穿村',
    image: '/images/banner-1.jpg',
    bg: 'linear-gradient(135deg, #46605f, #7a9598)'
  },
  {
    id: 'b2',
    spotId: 'baolunge',
    title: '宝纶阁',
    subtitle: '梁架彩绘 · 木雕细部',
    image: '/images/banner-2.jpg',
    bg: 'linear-gradient(135deg, #4f6b69, #85a3a0)'
  },
  {
    id: 'b3',
    spotId: 'yudeng',
    title: '鱼灯',
    subtitle: '徽州年节民俗',
    image: '/images/banner-3.jpg',
    bg: 'linear-gradient(135deg, #557371, #8fadaa)'
  },
  {
    id: 'b4',
    spotId: 'changchunshe',
    title: '长春社',
    subtitle: '村中的社屋建筑',
    image: '/images/banner-4.jpg',
    bg: 'linear-gradient(135deg, #405a58, #6f8f8c)'
  },
  {
    id: 'b5',
    spotId: 'gucunluo',
    title: '古村落',
    subtitle: '街巷与马头墙',
    image: '/images/banner-5.jpg',
    bg: 'linear-gradient(135deg, #38514f, #668684)'
  }
]

module.exports = {
  banners: banners
}
