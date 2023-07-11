<!-- 订单item组件 -->
<template>
  <view class="orderitem-container">
    <div class="order-left">
      <!-- 免费 图片 -->
      <img
        :src="freeList[item.scene_id].src"
        v-if="freeList[item.scene_id] && item.scene_type === 'free'"
      />
      <!-- 付费 图片 -->
      <img
        :src="paymentList[item.scene_id].src"
        v-if="paymentList[item.scene_id] && item.scene_type === 'payment'"
      />
      <!-- 混合 图片 -->
      <div class="mix-img" v-if="item.scene_type === 'mix'">
        <OverlayDisplay
          :list="freeList"
          type="free"
          page="order"
          :index="item.scene_id"
        ></OverlayDisplay>
        <OverlayDisplay
          :list="filterPayment"
          type="payment"
          page="order"
          :index="item.scene_id_1"
        ></OverlayDisplay>
      </div>
    </div>
    <div class="order-right">
      <!-- 免费 名字 -->
      <template>
        <div
          class="name"
          v-if="freeList[item.scene_id] && item.scene_type === 'free'"
        >
          {{ freeList[item.scene_id].name }}
        </div>
        <!-- 付费 名字 -->
        <div
          class="name"
          v-if="paymentList[item.scene_id] && item.scene_type === 'payment'"
        >
          {{ paymentList[item.scene_id].name }}
        </div>
        <!-- 混合 名字 -->
        <section class="mix" v-if="item.scene_type === 'mix'">
          <div class="name" v-if="freeList[item.scene_id]">
            {{ freeList[item.scene_id].name }}
          </div>
          <div class="name" v-if="filterPayment[item.scene_id_1]">
            {{ filterPayment[item.scene_id_1].name }}
          </div>
        </section>
      </template>
      <template>
        <div class="type" v-if="item.scene_type === 'free'">免费场景</div>
        <div class="type" v-if="item.scene_type === 'payment'">付费场景</div>
        <div class="type" v-if="item.scene_type === 'mix'">混合场景</div>
      </template>
    </div>
  </view>
</template>

<script>
import { getFreeList, getPaymentList } from '../../utils/getScene'
export default {
  name: 'OrderItem',
  data() {
    return {
      freeList: [],
      paymentList: [],
      filterPayment: []
    }
  },

  props: ['item'],

  methods: {
    // 筛选出已解锁的付费场景
    async filterPaymentList() {
      this.filterPayment = this.paymentList.filter(
        (item) => item.isLock === false
      )
    }
  },

  // 组件不是页面 所以生命周期为vue原生生命周期
  async created() {
    this.freeList = await getFreeList()
    this.paymentList = await getPaymentList()
    this.filterPaymentList()
  }
}
</script>

<style lang="less" scoped>
.orderitem-container {
  display: flex;
  align-items: center;
  width: 95%;
  height: 300rpx;
  margin-top: 20rpx;
  background-color: #fff;
  border-radius: 15rpx;

  .order-left {
    display: flex;
    align-items: center;
    padding-left: 20rpx;
    flex: 1;
    box-sizing: border-box;
    img {
      width: 100%;
      border-radius: 25rpx;
    }
    .mix-img {
      display: flex;
    }
  }

  .order-right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    height: 80%;
    padding-left: 30rpx;
    .name {
      font-size: 35rpx;
      font-weight: bold;
    }
    .type {
      font-size: 28rpx;
      color: #555;
    }
  }
}
</style>
