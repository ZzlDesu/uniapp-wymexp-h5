<template>
  <picker-view
    indicator-style="height: 50px;border: #f0f0f0 solid 3rpx"
    immediate-change="true"
    :value="value"
    @change="pickerChange"
  >
    <picker-view-column>
      <div class="item" v-for="item in list" :key="item.id">
        {{ item.name }}
      </div>
    </picker-view-column>
  </picker-view>
</template>

<script>
export default {
  name: 'OverlyPicker',
  data() {
    return {}
  },

  props: ['list', 'value'],

  methods: {
    pickerChange(e) {
      const currentIndex = e.detail.value[0]
      this.$emit('index', currentIndex)
    }
  }
}
</script>

<style lang="less" scoped>
picker-view {
  width: 100%;
  height: 350rpx;
  background-color: #f5f5f5;
}

.item {
  line-height: 100rpx;
  text-align: center;
}
</style>
