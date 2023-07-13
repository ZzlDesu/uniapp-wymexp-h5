<!-- 关于页面 -->
<template>
  <view>
    <view class="background">
      <image
        class="background-img"
        src="../../static/images/LOGObg.jpg"
        mode="widthFix"
      ></image>
    </view>
    <p class="about-text">
      微荧幕体验馆，是一个为情侣提供的看电影场所。我们的理念是利用先进的VR技术，提供场景并显示在VR里，利用这个场景进行一个电影的看。我们的创新在于我们结合了现有的VR技术，能把选择的场景显示在VR设备上供参考，同时还有场景的叠加方案，能渲染出不同的氛围。
    </p>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
page {
  background-color: #fff;
  .background {
    padding: 40rpx;
    .background-img {
      width: 100%;
    }
  }
  .about-text {
    padding-left: 40rpx;
    padding-right: 40rpx;
  }
}
</style>
