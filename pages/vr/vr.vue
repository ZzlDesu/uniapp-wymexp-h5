<!-- 场景页面 -->
<template>
  <view>
    <!-- 免费场景 -->
    <Scene :list="freeList" @swiperChange="changeHandlerFree">
      <template #scene-type>
        <h3>免费场景</h3>
      </template>
      <template #btn>
        <button @click="confirmChosen('free')">就它了</button>
      </template>
    </Scene>
    <!-- 付费场景 -->
    <Scene :list="paymentList" @swiperChange="changeHandlerPayment">
      <template #scene-type>
        <h3>解锁付费场景</h3>
      </template>
      <template #lock>
        <img src="http://pic.yupoo.com/zzl-desu/118b4b97/98fc821e.png" />
      </template>
      <template #btn>
        <button @click="unlockHandler" v-if="isLock">解锁</button>
        <button v-if="!isLock" @click="confirmChosen('payment')">
          确认订单
        </button>
      </template>
    </Scene>
    <!-- 叠加 -->
    <p>
      没有喜欢的？试试把场景叠加起来！
      <span @click="navigateToOverly">点击跳转</span>
    </p>
  </view>
</template>

<script>
import request from '../../utils/request'
import getUserinfo from '../../utils/getUserinfo'
import { getFreeList, getPaymentList } from '../../utils/getScene'
import confirmOrder from '../../utils/order'
export default {
  data() {
    return {
      freeList: [],
      paymentList: [],
      freeIndex: 0,
      paymentIndex: 0,
      isLock: true
    }
  },

  methods: {
    // 跳转到叠加页面
    async navigateToOverly() {
      const payBoolArr = await this.getSceneArr()
      if (payBoolArr.indexOf(false) === -1) {
        uni.showToast({
          title: '您还没有解锁付费场景',
          icon: 'none',
          duration: 2000
        })
      } else {
        uni.navigateTo({
          url: '/pages/overly/overly'
        })
      }
    },

    // 确认并跳转到订单
    confirmChosen(type) {
      let indexArr = []
      if (type === 'free') {
        indexArr.push(this.freeIndex)
      } else {
        indexArr.push(this.paymentIndex)
      }
      confirmOrder(type, JSON.stringify(indexArr))
    },

    // 解锁付费场景
    unlockHandler() {
      uni.showModal({
        title: '提示',
        content: '确认解锁此场景吗？',
        success: async (res) => {
          if (res.confirm) {
            const userinfo = await getUserinfo()
            const pay = JSON.parse(userinfo.pay_scene)
            pay[this.paymentIndex] = false

            const res = await request({
              url: '/api/updatescene',
              method: 'POST',
              data: {
                pay: JSON.stringify(pay),
                userid: userinfo.user_id
              }
            })
            if (res.status === 0) {
              uni.showToast({
                title: '解锁成功！',
                duration: 2000
              })
              this.initLock()
              this.changePayButton()
              this.$forceUpdate()
            }
          }
        }
      })
    },

    // 自定义事件Free
    changeHandlerFree(value) {
      this.freeIndex = value.index
      this.changePayButton()
    },

    // 自定义事件Payment
    changeHandlerPayment(value) {
      this.paymentIndex = value.index
      this.changePayButton()
    },

    // 数组字符串转换成数组
    async getSceneArr() {
      const userinfo = await getUserinfo()
      return JSON.parse(userinfo.pay_scene)
    },

    // 渲染解锁与否
    async initLock() {
      const payBoolArr = await this.getSceneArr()
      payBoolArr.forEach(async (item, index) => {
        let id = index + 1
        const res = await request({
          url: '/api/updatelock/' + id,
          method: 'POST',
          data: {
            isLock: item
          }
        })
        if (res.status === 0) {
          this.paymentList = await getPaymentList()
        }
      })
    },

    // 渲染解锁还是确认订单按钮
    async changePayButton() {
      const payBoolArr = await this.getSceneArr()
      this.isLock = payBoolArr[this.paymentIndex]
    }
  },

  async onLoad() {
    this.freeList = await getFreeList()
    this.paymentList = await getPaymentList()
    this.getSceneArr()
    this.initLock()
    this.changePayButton()
  }
}
</script>

<style lang="less" scoped>
page {
  background-color: #fff;
}
h3 {
  margin: 0 0 20rpx 90rpx;
}
img {
  position: absolute;
  right: 50rpx;
  bottom: 20rpx;
  width: 60rpx;
  height: 60rpx;
}

button {
  width: 350rpx;
  margin-top: 30rpx;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  border-radius: 50rpx;
}

p {
  margin-left: 50rpx;
  span {
    color: #ff9c00;
    font-weight: bold;
  }
}
</style>
