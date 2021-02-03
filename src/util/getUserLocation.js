let getCurrentCityName = function () {
  return new Promise(function (resolve, reject) {
    // let myCity = new BMap.LocalCity()
    // myCity.get(function (result) {
    //   resolve(result.name)
    // })
    const geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function getinfo(position){
      let city = position.address.city;             //获取城市信息
      let province = position.address.province;    //获取省份信息
      resolve(province)
    }, function(e) {
      _this.LocationCity = "定位失败"
    }, {provider: 'baidu'});

  })
}

export default getCurrentCityName
