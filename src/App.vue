<template>
  <div id="app" @touchmove.prevent>
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import HelloWorld from './components/HelloWorld.vue'
// import qs from 'query-string'
import axios from 'axios'
import VHeader from 'components/v-header/v-header'
// import { getSeller } from 'api'
import Goods from 'components/goods/goods'
// import Ratings from 'components/ratings/ratings'
// import Seller from 'components/seller/seller'
import Tab from 'components/tab/tab'

// const urlMap = {
//   development: '/',
//   production: 'http://ustbhuangyi.com/sell/'
// }
// // const baseUrl = urlMap[process.env.NODE_ENV]
const ERR_OK = 0

export default {
  name: 'app',
  data() {
    return {
      seller: {}
    }
  },
  computed: {
    tabs() {
      return [
        { label: 'Product',
          component: Goods,
          data: {
            seller: this.seller
          }
        },
        { label: 'Rating'

        },
        { label: 'Shop'

        }
      ]
    }
  },
  created() {
    // getSeller().then((seller) => {
    //   console.log('Seller2: ', seller)
    //   this.seller = seller
    // })
    // return axios.get(baseUrl + url, {
    //   params
    axios.get('/api/seller').then((res) => {
      if (res.data.errno === ERR_OK) {
        this.seller = res.data.data
        console.log('seller: ', this.seller)
      }
    }).catch((e) => {
    })
  },
  // mounted() {
    // getSeller().then((seller) => {
    //   console.log('Seller2: ', seller)
    //   this.seller = seller
    // })
    // _getSeller() {
    //   getSeller({
    //     id: this.seller.id
    //   }).then((seller) => {
    //     this.seller = seller
    //     // this.seller = Object.assign({}, this.seller, seller)
    //     console.log('Seller: ', this.seller)
    //   })
    // }
  // },
  components: {
    VHeader,
    Tab
  }
}
</script>

<style lang="stylus">
  #app
    .tab-wrapper
      position: fixed
      top: 136px
      left: 0
      right: 0
      bottom: 0
</style>
