import { get } from './helpers'

const getSeller = get('api/seller')
// console.log('Seller data from index:', getSeller())
const getGoods = get('api/goods')
const getRatings = get('api/ratings')

export {
  getSeller,
  getGoods,
  getRatings
}
