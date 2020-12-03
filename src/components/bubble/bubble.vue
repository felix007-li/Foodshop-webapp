<template>
  <span class="bubble">
    {{ num }}
  </span>
</template>

<script>
  export default {
    name: 'bubble',
    props: {
      num: {
        type: Number
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .bubble
    display: inline-block
    height: 16px
    line-height: 16px
    padding: 0 5px
    text-align: center
    font-family: Helvetica
    font-weight: 700
    border-radius: 16px
    font-size: $fontsize-small-s
    color: $color-white
    background: linear-gradient(to right, $color-orange, $color-red)
</style>
