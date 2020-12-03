<template>
  <transition name="fade">
    <cube-popup
      :mask-closable=true
      v-show="visible"
      @mask-click="maskClick"
      position="bottom"
      type="shop-cart-list"
      :z-index=90
    >
      <transition
        name="move"
        @after-leave="afterLeave"
      >
        <div v-show="visible">
          <div class="list-header">
            <h1 class="title">Shopping cart</h1>
            <span class="empty" @click="empty">Empty cart</span>
          </div>
          <cube-scroll class="list-content" ref="listContent">
            <ul>
              <li
                class="food"
                v-for="(food, index) in selectFoods"
                :key="index"
              >
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>${{ food.price * food.count }}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control @add="onAdd" :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script >
  import CartControl from 'components/cart-control/cart-control'
  import popupMixin from 'common/mixins/popup'

  const EVENT_LEAVE = 'leave'
  const EVENT_ADD = 'add'
  const EVENT_SHOW = 'show'

  export default {
    name: 'shop-cart-list',
    mixins: [popupMixin],

    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    created() {
      // 监听show方法
      this.$on(EVENT_SHOW, () => {
        this.$nextTick(() => {
          this.$refs.listContent.refresh()
        })
      })
    },
    methods: {
      // show() {
      //   this.visible = true
      // },
      // hide() {
      //   this.visible = false
      //   this.$emit(EVENT_HIDE)
      // },
      afterLeave() {
        this.$emit(EVENT_LEAVE)
      },
      maskClick() {
        this.hide()
      },
      onAdd(target) {
        this.$emit(EVENT_ADD, target)
      },
      empty() {
        this.dialogComp = this.$createDialog({
          type: 'confirm',
          // showClose: true,
          title: 'Empty the cart?',
          confirmBtn: {
            text: 'Confirm',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: 'Cancel',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            this.selectFoods.forEach((food) => {
              food.count = 0
            }).show()
          }
        })
        this.dialogComp.show()
      }
    },
    components: {
      CartControl
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .cube-shop-cart-list
    bottom: 48px
    &.fade-enter, &.fade-leave-active
      opacity: 0
    &.fade-enter-active, &.fade-leave-active
      transition: all .4s ease-in-out
    .move-enter, .move-leave-active
      transform: translate3d(0, 100%, 0)
    .move-enter-active, .move-leave-active
      transition: all .4s ease-in-out
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: $color-background-ssss
      .title
        float: left
        font-size: $fontsize-medium
        color: $color-dark-grey
      .empty
        float: right
        font-size: $fontsize-small
        color: $color-blue
    .list-content
      padding: 0 18px
      max-height: 217px
      overflow: hidden
      background: $color-white
      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        border-bottom: 1px solid rgba(7,17,27,0.1)
        &:last-child
          border-bottom: none
        .name
          line-height: 24px
          font-size: 14px
          color: rgb(7,17,27)
        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height: 24px
          font-size: 12px
          color: rgb(240,20,20)
          font-weight: 700
        .cart-control-wrapper
          position: absolute
          right: 0
          bottom: 6px
</style>
