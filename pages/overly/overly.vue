<!-- 叠加页面 -->
<template>
  <view>
    <div class="display">
      <OverlayDisplay
        :list="freeList"
        type="free"
        page="overly"
        :index="freeIndex"
      ></OverlayDisplay>
      <OverlayDisplay
        :list="filterPayment"
        type="payment"
        page="overly"
        :index="paymentIndex"
      ></OverlayDisplay>
    </div>
    <div class="scene-type">
      <div><span>免费场景</span></div>
      <div><span>已解锁的付费场景</span></div>
    </div>
    <div class="picker">
      <OverlyPicker :list="freeList" @index="getFreeIndex"></OverlyPicker>
      <OverlyPicker
        :list="filterPayment"
        @index="getPaymentIndex"
      ></OverlyPicker>
    </div>
    <button @click="confirmChosen('mix')">选好了</button>
  </view>
</template>

<script>
import { getFreeList, getPaymentList } from '../../utils/getScene'
import confirmOrder from '../../utils/order'
export default {
  data() {
    return {
      freeList: [],
      filterPayment: [],
      freeIndex: 0,
      paymentIndex: 0
    }
  },
  methods: {
    // 筛选出已解锁的付费场景
    async filterPaymentList() {
      const paymentList = await getPaymentList()
      this.filterPayment = paymentList.filter((item) => item.isLock === false)
    },

    // 自定义事件
    getFreeIndex(value) {
      this.freeIndex = value
    },

    // 自定义事件
    getPaymentIndex(value) {
      this.paymentIndex = value
    },

    // 选择并跳转到订单
    confirmChosen(type) {
      let indexArr = []
      indexArr.push(this.freeIndex)
      indexArr.push(this.paymentIndex)
      confirmOrder(type, JSON.stringify(indexArr))
    }
  },
  async onLoad() {
    this.freeList = await getFreeList()
    this.filterPaymentList()
  }
}
</script>

<style lang="less" scoped>
page {
  background-color: #fff;
}
.display {
  display: flex;
  position: relative;
  left: 50%;
  margin-left: -200rpx;
  margin-top: 100rpx;
  overflow: hidden;
}
.scene-type {
  display: flex;
  margin-top: 100rpx;
  div {
    width: 50%;
    text-align: center;
    span {
      padding-bottom: 10rpx;
      border-bottom: #ffbb4e solid 10rpx;
    }
  }
}
.picker {
  display: flex;
  margin-top: 20rpx;
}

button {
  width: 350rpx;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  border-radius: 50rpx;
}
</style>
