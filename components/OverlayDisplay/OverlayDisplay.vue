<!-- 叠加场景的图片组件 -->
<template>
  <div
    :class="[
      page === 'overly' ? 'box-overly' : 'box-order',
      type === 'free' ? 'left' : 'right'
    ]"
  >
    <img :src="list[index].src" v-if="list[index]" />
  </div>
</template>

<script>
export default {
  name: 'OverlayDisplay',
  data() {
    return {}
  },
  props: ['list', 'type', 'index', 'page']
}
</script>

<style lang="less" scoped>
.box-overly,
.box-order {
  overflow: hidden;
}

.box-overly {
  width: 200rpx;
  height: 300rpx;
}

.box-order {
  width: 165rpx;
  height: 200rpx;
}

.left {
  border-radius: 25rpx 0 0 25rpx;
}
.right {
  border-radius: 0 25rpx 25rpx 0;
}

img {
  height: 100%;
}
</style>
