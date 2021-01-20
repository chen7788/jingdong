import axios from 'axios'
// import store from '@/store'



// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // url = base url + requesb url
  withCredentials:false,// 允许携带cookie
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000, // request timeout
  headers: {
    'Content-Type': 'application/json',// form-data "application/x-www-form-urlencoded;charset=utf-8"
  },
  responseType:'blob',
  transformResponse:[ function (data) {
    // let reader = new FileReader()
    // reader.readAsText(data, 'GBK')
    // reader.onload = function (e) {
    //   console.log(reader.result)
    //   data = JSON.parse(reader.result)
    // }
    return data
  }]
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['Token'] = getToken(),
    //     config.headers['requestPage'] = store.getters.menuLink
    //   //config.headers['Content-Type'] = getContentType()
    // }
    // if (getContentType() === 'application/x-www-form-urlencoded'){
    //   let data = formDataWithData(config.data)
    //   config.data = data
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)



// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response
        // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 200) {
      if (res.status === 401){
        this.$confirm({
          title:'Re-Login',
          content:'You have been logged out, you can cancel to stay on this page, or log in again\', \'Confirm logout',
          onOk(){
            // store.dispatch('user/resetToken').then(() => {
            //   location.reload()
            // })
          }
        })
      }
      this.$message.error('res.message || \'Error\'',5)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {

      return res
    }
  },
  error => {
    this.$message.error('error.message || \'Error\'',5)
    return Promise.reject(error)
  }
)

export default service
