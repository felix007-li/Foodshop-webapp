<template>
  <transition
    name="move"
    @after-leave="afterLeave"
  >
    <div class="food" v-show="visible">
      <cube-scroll ref="scroll">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="back">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{ food.name }}</h1>
            <div class="detail">
              <span class="sell-count">Monthly sale: {{ food.sellCount }}</span>
              <span class="rating">Good rating: {{ food.rating }}</span>
            </div>
            <div class="price">
              <span class="now">${{ food.price }}</span>
              <span class="old" v-show="food.oldPrice">${{ food.oldPrice }}</span>
            </div>
            <div class="cart-control-wrapper">
              <cart-control :food="food"></cart-control>
            </div>
            <div class="buy" v-show="!food.count" @click="addFirst">
              Add to Cart
            </div>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="title">{{ 'Food info' }}</h1>
            <p class="text">{{ food.info }}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">Food Review</h1>
            <rating-select
              @select="onSelect"
              @toggle="onToggle"
              :selectType="selectType"
              :onlyContent="onlyContent"
              :desc="desc"
              :ratings="ratings">
            </rating-select>
            <div class="rating-wrapper">
              <ul v-show="computedRatings && computedRatings.length">
                <li
                  v-for="(rating,index) in computedRatings"
                  class="rating-item border-bottom-1px"
                  :key="index"
                >
                  <div class="user">
                    <span class="name">{{ rating.username }}</span>
                    <img :src="rating.avatar" width="12" height="12" class="avatar">
                  </div>
                  <div class="time">{{ format(rating.rateTime)}}</div>
                  <p class="text">
                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{ rating.text }}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!computedRatings || !computedRatings.length">No rating</div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  import CartControl from 'components/cart-control/cart-control'
  import RatingSelect from 'components/rating-select/rating-select'
  import Split from 'components/split/split'
  import ratingMixin from 'common/mixins/rating'
  import popupMixin from 'common/mixins/popup'

  const EVENT_SHOW = 'show'
  const EVENT_ADD = 'add'
  const EVENT_LEAVE = 'leave'

  export default {
    name: 'food',
    mixins: [ratingMixin, popupMixin],
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        desc: {
          all: 'All',
          positive: 'Recommends',
          negative: 'Doesn\'t Recommend'
        }
      }
    },
    computed: {
      ratings() {
        console.log('rating:', this.food.ratings)
        return this.food.ratings
      }
    },
    created() {
      this.$on(EVENT_SHOW, () => {
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      })
    },
    methods: {
      addFirst() {
        this.$set(this.food, 'count', 1)
      },
      afterLeave() {
        this.$emit(EVENT_LEAVE)
      },
      back() {
        this.hide()
        this.$emit(EVENT_LEAVE)
      },
      format(time) {
        return moment(time).format('YYYY-MM-DD hh:mm')
      }
    },
    components: {
      CartControl,
      RatingSelect,
      Split
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin.styl"

  .food
    position: fixed
    left: 0
    top: 0
    width: 100%
    bottom: 48px
    z-index: 30
    background: $color-white
    &.move-enter-active, &.move-leave-active
      transition: all 0.3s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0px
        .icon-arrow_lift
          padding: 10px
          color: #fff
    .content
      padding: 18px
      position: relative
      .title
        font-size: 14px
        margin-bottom: 8px
        color: rgb(7,17,27)
        font-weight: 700
        line-height: 14px
      .detail
        margin-top: 8px
        font-size: 10px
        color: rgb(147,153,159)
        line-height: 10px
        .sell-count, .rating
          font-size: $fontsize-small-s
          color: $color-light-grey
        .sell-count
          margin-right: 12px
      .price
        margin-top: 18px
        .now
          font-size: 14px
          font-weight: 700
          color: rgb(240,20,20)
          line-height: 24px
          margin-right: 8px
        .old
          text-decoration:line-through
          font-size: 10px
          color: rgb(147,153,159)
          line-height: 24px
      .cart-control-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        bottom: 18px
        right: 18px
        height: 24px
        line-height: 24px
        font-size: 12px
        color: rgb(255,255,255)
        padding: 2px 12px
        border-radius: 12px
        background-color: rgb(0,160,220)
        opacity: 1
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.3s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          z-index: -1
    .info
      padding: 18px
      .title
        font-size: 14px
        margin: 8px 0px
        color: rgb(7,17,27)
        line-height: 14px
      .text
        padding: 6px 8px 6px 8px
        font-size: 12px
        font-weight: 200
        color: rgb(77,85,93)
        line-height: 24px
    .rating
      padding: 18px
      .title
        font-size: 14px
        margin: 8px 0px
        color: rgb(7,17,27)
        line-height: 14px
      .rating-item
        padding: 16px 0px
        position: relative
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .user
          position: absolute
          right: 0
          top: 16px
          display: flex
          .name
            margin-right: 6px
            font-size: 10px
            line-height: 12px
          .avatar
            border-radius: 50%
            // height: 12px
            // line-height: 12px
        .time
          font-size: 10px
          color: rgb(147,153,159)
          line-height: 12px
        .text
          margin-top: 6px
          font-size: 12px
          color: rgb(7,17,27)
          line-height: 16px
          .icon-thumb_up, .icon-thumb_down
            margin-right: 4px
            line-height: 16px
            font-size: $fontsize-small
          .icon-thumb_up
            color: $color-blue
          .icon-thumb_down
            color: $color-light-grey
      .no-rating
          padding: 16px 0
          font-size: $fontsize-small
          color: $color-light-grey
</style>
