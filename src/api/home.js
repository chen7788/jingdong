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

export function getNewProduct() {
  return request({
    url: 'banner/recommend-v20/new/get?source=pc-home&callback=jsonpNewArrival&_=1603093373119',
    method: 'get',
  })
}
export function getRankingTitles() {
  return request({
    url: 'ch/homecate2?source=pc&source=pc&callback=jsonpTopCate&_=1603093373119',
    method: 'get',
  })
}
export function getRankingList(cateId) {
  return request({
    url: 'ch/homepro',
    method: 'get',
    params:{'source':'pc','cateId':cateId,'callback':'jsonTopRank0','_':'1608706504505'}
  })
}
export function getGoodShop() {
  return request({
    url: 'banner/recommend-v20/haodian/get?source=pc-home&pin=&uuid=1603072424503552394814&area=19_1607_3155_0&callback=jsonpNiceShop&_=1603093373120',
    method: 'get',
  })
}
export function getCoupon() {
  return request({
    url: 'banner/recommend-v20/coupon/get?source=pc-home&pin=&uuid=1603072424503552394814&area=19_1607_3155_0&callback=jsonpCoupon&_=1603093373122',
    method: 'get',
  })
}
export function getChannelList() {
  return request({
    url: 'banner/recommend-v20/market/get?source=pc-home&except_item_id=9688&pin=&uuid=1603072424503552394814&area=19_1607_3155_0&callback=jsonpMarket&_=1603095740757',
    method: 'get',
  })
}
export function getRecommendedList(page,id) {
  return request({
    url: 'banner/user-v20/feed/get',
    method: 'get',
    params:{page:page,pageSize:'25',area:'19_1607_3155_0','source':'pc-home','callback':'jsonpMore2Goods','_':id}
  })
}
export function getRecommendedJoy() {
  return request({
    url: 'banner/recommend-v20/feed_content/get?pin=&uuid=1978685641&jda=76161171.1978685641.1607936621.1609143415.1609214085.10&num=1&source=pc-home&callback=jsonpMore2Others&_=1609214856600',
    method: 'get',
  })
}

export function getLogo() {
  return request({
    url: 'banner/recommend-v20/joy_logo/get?source=pc-home&pin=&uuid=1978685641&callback=jsonpLogo&_=1609911402244',
    method: 'get',
  })
}
export function getShortService() {
  return request({
    url: 'menu/client/get?&callback=jsonpshortService',
    method: 'get',
  })
}
export function getShortSiteNav() {
  return request({
    url: 'menu/navigation/get?&callback=jsonpshortcutSitenav',
    method: 'get',
  })
}
export function getShortCartNum() {
  return request({
    url: 'https://cart.jd.com/cart/miniCartServiceNew.action?method=GetCart&callback=__jsonp16',
    method: 'get',
  })
}
export function getShopHotKey() {
  return request({
    url: 'cds//hotwords/get?callback=jQuery3030269&cate=737%2C738%2C749&_=1611558800186',
    method: 'get',
  })
}
//领券
export function getShopWarranty() {
  return request({
    url: 'https://item-soa.jd.com/getWareBusiness?callback=jQuery625093&skuId=67336606933&cat=737%2C794%2C880&area=19_1601_3633_0&shopId=10198857&venderId=10344968&paramJson=%7B%22platform2%22%3A%221%22%2C%22colType%22%3A0%2C%22specialAttrStr%22%3A%22p0pppppppppppppppppppp%22%2C%22skuMarkStr%22%3A%2200%22%7D&num=1',
    method: 'get',
  })
}
//店长推荐
export function getShopDiviner() {
  return request({
    url: 'https://jshop-rec.jd.com/queryData.html?callback=jQuery7447894&SKU=67336606933&venderId=10344968&_=1611214227924',
    method: 'get',
  })
}
//评价数
export function getShopCommentCount() {
  return request({
    url: 'https://club.jd.com/comment/productCommentSummaries.action?referenceIds=67336606933&callback=jQuery8791137&_=1611214227905',
    method: 'get',
  })
}
//区
export function getShopArea() {
  return request({
    url: 'https://fts.jd.com/area/get?fid=1601&callback=jQuery6983649&_=1611214228415',
    method: 'get',
  })
}
//街道
export function getShopRoad() {
  return request({
    url: 'https://fts.jd.com/area/get?fid=3633&callback=jQuery9461691&_=1611214228416',
    method: 'get',
  })
}
//店铺名称
export function getShopName() {
  return request({
    url: 'https://chat1.jd.com/api/checkChat?callback=jQuery4804064&pid=67336606933&returnCharset=utf-8&_=1611215553638',
    method: 'get',
  })
}
//配件
export function getShopCombo() {
  return request({
    url: 'https://c.3.cn/recommend?callback=handleComboCallback&methods=accessories&p=103003&sku=100003280608&cat=737%2C738%2C749&lid=19&uuid=1978685641&pin=&ck=pin%2CipLocation%2Catw%2Caview&lim=5&cuuid=1978685641&csid=122270672.6.1978685641%7C48.1611558800&_=1611561692645',
    method: 'get',
  })
}
//播放
export function getShopPlay() {
  return request({
    url: 'play/tencent/video_v3?callback=jQuery7997583&vid=523696378&type=1&from=1&appid=24&_=1611561692481',
    method: 'get',
  })
}
//商品信息
export function getShopInfo() {
  return request({
    url: 'item/getWareBusiness?callback=jQuery5353863&skuId=100003280608&cat=737%2C738%2C749&area=19_1601_3633_0&shopId=1000282702&venderId=1000282702&paramJson=%7B%22platform2%22%3A%22100000000001%22%2C%22specialAttrStr%22%3A%22p0ppp1ppppppppppppppppp%22%2C%22skuMarkStr%22%3A%2200%22%7D&num=1',
    method: 'get',
  })
}
