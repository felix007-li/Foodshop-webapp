<template>
  <div class="rating-select">
    <div class="rating-type">
      <span @click="select(2)" class="block positive" :class="{'active': selectType === 2}">
        {{ desc.all }}<span class="count">{{ ratings.length }}</span>
      </span>
      <span @click="select(0)" class="block positive" :class="{'active': selectType === 0}">
        {{ desc.positive }}<span class="count">{{ positives.length }}</span>
      </span>
      <span @click="select(1)" class="block negative" :class="{'active': selectType === 1}">
        {{ desc.negative }}<span class="count">{{ negatives.length }}</span>
      </span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on': onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">Only see the review with comment</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  const EVENT_TOGGLE = 'toggle'
  const EVENT_SELECT = 'select'

  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: 'All',
            positive: 'Recommends',
            negative: 'Doesn\'t Recommend'
          }
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      select(type) {
        this.$emit(EVENT_SELECT, type)
      },
      toggleContent() {
        this.$emit(EVENT_TOGGLE)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .rating-select
    padding: 16px 0px
    .rating-type
      display: inline-block
      margin-bottom: 18px
      .block
        font-size: 12px
        color: rgb(77,85,93)
        line-height: 16px
        border-radius: 2px
        padding: 8px
        margin-right: 8px
        &.positive
          background: rgba(0,160,220,0.2)
          &.active
            background: $color-blue
        &.negative
          background: $color-light-grey-s
          &.active
            background: $color-grey
        &.active
          color: $color-white
        .count
          font-size: 9px
          margin-left: 3px
    .switch
      display: flex
      line-height: 24px
      padding: 12px 0px
      color: $color-light-grey
      border-bottom: 1px solid $color-row-line
      &.on
        .icon-check_circle
          color: $color-green
      .icon-check_circle
        font-size: $fontsize-large-xxx
      .text
        font-size: 12px
        margin-left: 4px
</style>
