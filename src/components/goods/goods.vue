<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
        :side=true
        :data="goods"
        :options="scrollOptions"
        v-if="goods.length"
      >
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="props.labels"
            :txts="barTxts"
            :current="props.current"
          >
            <template slot-scope="props">
              <div class="text">
                <support-ico
                  v-if="props.txt.type>=1"
                  :size=3
                  :type="props.txt.type"
                ></support-ico>
                <span>{{props.txt.name}}</span>
                <span class="num" v-if="props.txt.count">
                  <bubble :num="props.txt.count"></bubble>
                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
          v-for="good in goods"
          :key="good.name"
          :label="good.name"
          :title="good.name"
        >
          <ul>
            <li
              @click="selectFood(food)"
              v-for="food in good.foods"
              :key="food.name"
              class="food-item"
            >
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control @add="onAdd" :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-cart-wrapper">
      <shop-cart
        ref="shopCart"
        :select-foods="selectFoods"
        :delivery-price="seller.deliveryPrice"
        :min-price="seller.minPrice"></shop-cart>
    </div>
  </div>
</template>

<script>
  import { getGoods } from 'api'
  import CartControl from 'components/cart-control/cart-control'
  import SupportIco from 'components/support-ico/support-ico'
  import ShopCart from 'components/shop-cart/shop-cart'
  import Bubble from 'components/bubble/bubble'
  // import Food from 'components/food/food'

  export default {
    name: 'goods',
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        goods: [],
        selectedFood: {},
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      seller() {
        // console.log('The value of seller: ', this.data.seller)
        return this.data.seller
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          console.log('goods:', good)
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      },
      barTxts() {
        let ret = []
        this.goods.forEach((good) => {
          const { type, name, foods } = good
          let count = 0
          foods.forEach((food) => {
            count += food.count || 0
            console.log('Food.count = ', food.count)
          })
          ret.push({
            type,
            name,
            count
          })
        })
        console.log('The value of ret', ret)
        return ret
      }
    },
    methods: {
      fetch() {
        if (!this.fetched) {
          this.fetch = true
          getGoods({
            // id: this.seller.id
          }).then((goods) => {
            this.goods = goods
            console.log('The value of goods: ', this.goods)
            console.log('The value of seller: ', this.data.seller)
          })
        }
      },
      selectFood(food) {
        console.log('Selected food: ', food)
        this.selectedFood = food
        this._showFood()
        this._showShopCartSticky()
      },
      onAdd(target) {
        this.$refs.shopCart.drop(target)
      },
      _showFood() {
        this.foodComp = this.foodComp || this.$createFood({
          $props: {
            food: 'selectedFood'
          },
          $events: {
            leave: () => {
              this._hideShopCartSticky()
            }
          }
        })
        this.foodComp.show()
      },
      _showShopCartSticky() {
        this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
          $props: {
            selectFoods: 'selectFoods',
            deliveryPrice: this.seller.deliveryPrice,
            minPrice: this.seller.minPrice,
            fold: true
          }
        })
        this.shopCartStickyComp.show()
      },
      _hideShopCartSticky() {
        this.shopCartStickyComp.hide()
      }
    },
    components: {
      SupportIco,
      ShopCart,
      CartControl,
      Bubble
      // Food
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"

  .goods
    position: relative
    text-align: left
    height: 100%
    .scroll-nav-wrapper
      position: absolute
      width: 100%
      top: 0
      left: 0
      bottom: 48px
    >>> .cube-scroll-nav-bar
        width: 80px
        white-space: normal
        overflow: hidden
    >>> .cube-scroll-nav-bar-item
        padding: 0 10px
        display: flex
        align-items: center
        height: 54px
        font-weight: 200
        font-size: 12px
        line-height: 14px
        padding-bottom: 2px
        border-bottom: 1px solid rgba(7,17,27,0.1)
        background: #f3f5f7
        &:last-child
          border-bottom: 0px
        .text
          flex: 1
          position: relative
        .num
          position: absolute
          top: -10px
          right: -8px
        .support-ico
          display: inline-block
          vertical-align: top
          margin-right: 4px
    >>> .cube-scroll-nav-panel-title
          padding-left: 14px
          border-left: 2px solid #d9dde1
          font-size: 12px
          height: 26px
          line-height: 26px
          color: reb(147,153,159)
          background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      border-bottom: 1px solid rgba(7,17,27,0.1)
      position: relative
      &:last-child
        margin-bottom: 0
        border-bottom: none
      .icon
        flex: 0 0 57px
        .img
          height: auto
      .content
        flex: 1
        margin-left: 10px
        .name
          padding-top: 2px
          font-size: 14px
          color: rgb(7,17,27)
          font-weight: 700
          line-height: 14px
        .desc, .extra
          margin-top: 8px
          font-size: 10px
          color: rgb(147,153,159)
          line-height: 10px
        .extra
          margin-bottom: 8px
          .count
            margin-right: 12px
        .price
          .now
            font-size: 14px
            color: $color-red
            font-weight: 700
            line-height: 24px
            margin-right: 8px
          .old
            text-decoration:line-through
            font-size: 10px
            color: rgb(147,153,159)
        .cart-control-wrapper
          position: absolute
          right: 0
          bottom: 12px
    .shop-cart-wrapper
      position: absolute
      width: 100%
      left: 0
      bottom: 0
      z-index: 50
      height: 48px
      background: #141d27
</style>
