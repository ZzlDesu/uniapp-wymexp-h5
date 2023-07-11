<template>
  <view>
    <section>
      <slot name="scene-type"></slot>
      <swiper
        @change="changeHandler"
        previous-margin="90rpx"
        next-margin="90rpx"
      >
        <swiper-item v-for="item in list" :key="item.id">
          <img :src="item.src" class="swiper-img" />
          <div v-if="item.isLock">
            <slot name="lock"></slot>
          </div>
        </swiper-item>
      </swiper>
      <p v-if="list[currentIndex]">当前场景：{{ list[currentIndex].name }}</p>
      <slot name="btn"></slot>
    </section>
  </view>
</template>

<script>
export default {
  name: 'Scene',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: ['list'],

  methods: {
    // swiper滑动事件
    changeHandler(e) {
      this.currentIndex = e.detail.current
      this.$emit('swiperChange', { index: this.currentIndex })
    }
  }
}
</script>

<style lang="less" scoped>
section {
  margin: 30rpx 0 50rpx 0;
  .swiper-img {
    height: 320rpx;
    width: 520rpx;
    border-radius: 10rpx;
    box-shadow: 0px 0px 30rpx rgba(0, 0, 0, 0.2);
    margin: 0rpx 30rpx;
    z-index: 1;
  }
  p {
    text-align: center;
  }
}
</style>
