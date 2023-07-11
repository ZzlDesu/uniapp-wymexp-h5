<template>
  <view>
    <section class="login" @click="loginHandler">
      <img src="http://pic.yupoo.com/zzl-desu/e207beed/45c5d14d.png" />
      <p v-if="username">{{ username }}</p>
      <p v-if="!username">点击头像登录</p>
    </section>
    <section class="bars">
      <uni-list>
        <uni-list-item showArrow title="我的订单" to="/pages/order/order" />
        <uni-list-item showArrow>
          <template #body>
            <button open-type="feedback">反馈建议</button>
          </template>
        </uni-list-item>
        <uni-list-item showArrow>
          <template #body>
            <button open-type="contact">在线客服</button>
          </template>
        </uni-list-item>
        <uni-list-item v-if="username">
          <template #body
            ><div class="logout-bar" @click="logoutHandler">
              退出登录
            </div></template
          >
        </uni-list-item>
      </uni-list>
    </section>
  </view>
</template>

<script>
import decodeToken from '../../utils/decode'
export default {
  data() {
    return {
      username: ''
    }
  },

  methods: {
    // 登录
    loginHandler() {
      if (this.username) return
      uni.navigateTo({
        url: '/pages/login/login'
      })
    },

    // 退出登录
    logoutHandler() {
      uni.removeStorageSync('accessToken')
      uni.removeStorageSync('refreshToken')
      uni.showToast({
        title: '退出成功',
        duration: 2000
      })
      setTimeout(() => {
        this.$router.go(0)
      }, 1500)
    },

    async getUserinfo() {
      const token = uni.getStorageSync('accessToken')
      if (!token) return
      const decoded = await decodeToken(token)
      this.username = decoded.uname
    }
  },

  onShow() {
    this.getUserinfo()
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400rpx;
  background-color: #ffbb4d;
  img {
    height: 60%;
  }
  p {
    color: #fff;
    font-size: 40rpx;
    font-weight: bold;
  }
}

.bars {
  .logout-bar {
    text-align: center !important;
    // line-height: 100rpx;
  }

  button {
    font-size: 28rpx !important;
    background-color: #fff;
    width: 100%;
    line-height: normal;
    margin: 0;
    padding: 0;
    text-align: left;
  }
  /* 去掉uniapp中button自带的边框 */
  button::after {
    content: none;
  }

  /deep/.uni-list-item__container {
    display: block;
  }
}
</style>
