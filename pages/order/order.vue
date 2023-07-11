<template>
  <view class="order-container">
    <OrderItem
      v-for="(item, index) in orderList"
      :key="index"
      :item="item"
    ></OrderItem>
  </view>
</template>

<script>
import decodeToken from '../../utils/decode'
import request from '../../utils/request'
export default {
  data() {
    return {
      orderList: []
    }
  },

  methods: {
    // 请求拿数据
    async getOrder() {
      const token = uni.getStorageSync('accessToken')
      const decoded = await decodeToken(token)

      const res = await request({
        url: '/api/getorder',
        method: 'GET',
        data: {
          user_id: decoded.uid
        }
      })
      res.data.forEach((item) => {
        if (item.scene_type === 'free' || item.scene_type === 'payment') {
          ;[item.scene_id] = JSON.parse(item.scene_id)
        } else {
          ;[item.scene_id, item.scene_id_1] = JSON.parse(item.scene_id)
        }
      })
      this.orderList = res.data
    }
  },

  onLoad() {
    this.getOrder()
  }
}
</script>

<style lang="less">
page {
  background-color: #f2f3f4;
}
.order-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
</style>
