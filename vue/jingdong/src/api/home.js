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
