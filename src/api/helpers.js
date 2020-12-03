import axios from 'axios'

// const urlMap = {
//   development: '/',
//   production: 'http://ustbhuangyi.com/sell/'
// }
// const baseUrl = urlMap[process.env.NODE_ENV] // process.env.NODE_ENV: production的URL
const ERR_OK = 0

export function get(url) {
  return function(params = {}) {
    // return axios.get(baseUrl + url, {
    //   params
    return axios.get(url, {
      params
    }).then((res) => {
      // console.log('res: ', res)
      const { errno, data } = res.data
      console.log('data::: ', data)
      if (errno === ERR_OK) {
        return data
      }
    }).catch((e) => {
    })
  }
}
