import request from '@/util/request'

//分类
export function getCategory() {
  return request({
    url: '/menu/category/get',
    method: 'get',
    params: {"callback":"getCategoryCallback"}
  })
}
//分类
export function getFocusBanner() {
  return request({
    url: '/banner/recommend-v20/focus_monetize/get?source=pc-home&user_level=undefined&callback=jsonpFocus&_=1603072533253',
    method: 'get',
  })
}
//分类
export function getFocusBannerRight() {
  return request({
    url: '/banner/recommend-v20/today/get?source=pc-home&user_level=undefined&callback=jsonpRecommend&_=1603072533254',
    method: 'get',
  })
}
//未授权显示请登录
export function getHelloService() {
  return request({
    url: '/hello/new/helloService.ashx?pin=&uuid=1603072424503552394814&callback=jsonpHelloService&_=1603072533249',
    method: 'get',
  })
}
//快报
export function getNews() {
  return request({
    url: 'banner/recommend-v20/news/get?source=pc-home&pin=&uuid=1603072424503552394814&jda=76161171.1603072424503552394814.1603072424.1603072424.1603072424.1&callback=jsonpNews&_=1603072533250',
    method: 'get',
  })
}

export function getHotwords() {
  return request({
    url: '/banner/user-v20/hotwords/get?source=pc-home&pin=&uuid=1603072424503552394814&callback=jsonpHotWords&_=1603072533252',
    method: 'get',
  })
}
export function getHeaderTitle() {
  return request({
    url: 'title/aggPool?source=pc_home&body=%5B%7B%22pid%22%3A%220302692%22%7D%5D&callback=jsonpNavitems&_=1603072533253',
    method: 'get',
  })
}
export function getSecKill() {
  return request({
    url: 'title/pchome/pcIndexMiaoShaArea?source=pc_seckill&pin=&uuid=1603678710532330472915&isAdvance=0&callback=jsonpSeckill&_=1604025700232',
    method: 'get',
  })
}
export function getSuperBrand() {
  return request({
    url: 'banner/recommend-v20/enjoy_beta/get?source=pc-home&pin=&uuid=16042967075772018923923&type=S2&callback=jsonpActivity&_=1604303396534',
    method: 'get',
  })
}
export function getSpecialPrice(index) {
  let para = {}
  switch (index) {
    case 1:
      para = {'source':'pc-home','id':'32','callback':'jsonpSpecialOfferContent0','_':'1604372160662'}
      break
    case 2:
      para = {'source':'pc-home','id':'35','callback':'jsonpSpecialOfferContent0','_':'1604303396968'}
      break
    case 3:
      para = {'source':'pc-home','id':'35','callback':'jsonpSpecialOfferContent0','_':'1604372162389'}
      break
    default:
      para = {'source':'pc-home','id':'34','callback':'jsonpSpecialOfferContent0','_':'1604372162756'}
  }
  return request({
    url: 'banner/recommend-v20/daily_speci_data/get',
    method: 'get',
    params:para
  })
}
export function getSpecialPriceMenu() {
  return request({
    url: 'banner/recommend-v20/daily_speci_tab/get?source=pc-home&callback=jsonpSpecialOffer&_=1603093369433t',
    method: 'get',
  })
}
export function getLightingBuy() {
  return request({
    url: 'banner/recommend-v20/red_new/get?source=pc-home&pin=&callback=jsonpLightningBuy&_=1604392849688',
    method: 'get',
  })
}
export function getNiceGoods() {
  return request({
    url: 'banner/recommend-v20/discover_goods/get?source=pc-home&pin=&callback=jsonpNiceGoods&_=1603093370303',
    method: 'get',
  })
}
