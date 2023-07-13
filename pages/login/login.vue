<!-- 登录页面 -->
<template>
  <view class="login-container">
    <div class="body">
      <div class="img-box">
        <img src="../../static/images/LogoAlpha.png" />
      </div>
      <h2>微荧幕体验馆</h2>
      <form @submit="submitHandler">
        <input
          type="text"
          placeholder="请输入用户名"
          placeholder-class="placeholder"
          v-model.trim="userName"
        />
        <input
          type="text"
          password
          placeholder="请输入密码"
          placeholder-class="placeholder"
          v-model.trim="passWord"
        />
        <p class="tips">{{ tips }}</p>
        <button form-type="submit">登录</button>
      </form>
      <p class="register">
        没有账号？
        <span class="navigate" @click="navigateHandler">点击注册</span>
      </p>
    </div>
  </view>
</template>

<script>
import request from '../../utils/request'
export default {
  data() {
    return {
      userName: '',
      passWord: '',
      tips: ''
    }
  },

  methods: {
    async submitHandler() {
      // 请求比对用户名与密码

      const res = await request({
        url: '/api/login',
        method: 'POST',
        data: {
          username: this.userName,
          password: this.passWord
        }
      })

      if (res.status === 1) {
        this.tips = res.message
      } else {
        this.tips = ''
        this.userName = ''
        this.passWord = ''

        // 保存accessToken
        uni.setStorage({
          key: 'accessToken',
          data: res.accessToken
        })

        // 保存refreshToken
        uni.setStorage({
          key: 'refreshToken',
          data: res.refreshToken
        })

        uni.showToast({
          title: '登录成功！'
        })

        setTimeout(() => {
          uni.hideToast()
          // 跳转到个人页面
          uni.switchTab({
            url: '/pages/user/user'
          })
        }, 1500)
      }
    },

    // 跳转到注册页面
    navigateHandler() {
      uni.navigateTo({
        url: '/pages/register/register'
      })
    }
  }
}
</script>

<style lang="less" scoped>
page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffbb4d;
}
.login-container {
  display: flex;
  width: 600rpx;
  height: 800rpx;

  .body {
    position: relative;
    width: 100%;
    padding: 0 50rpx;
    background-color: #fff;
    border-radius: 30rpx;
    box-sizing: border-box;

    .img-box {
      position: absolute;
      left: 50%;
      margin-left: -80rpx;
      top: -80rpx;
      width: 160rpx;
      height: 160rpx;
      background-color: #000;
      border-radius: 160rpx;
      img {
        width: 100%;
      }
    }
    h2 {
      text-align: center;
      font-weight: normal;
      margin: 100rpx 0 50rpx 0;
    }
    input {
      height: 80rpx;
      border-bottom: #ddd solid 3rpx;
    }

    .tips {
      margin-top: 10rpx;
      color: red;
    }

    button {
      margin-top: 50rpx;
      background-image: linear-gradient(to right, #ffc568e6, #ffbb4d);
      color: #fff;
      border-radius: 100rpx;
    }

    .register {
      margin-top: 20rpx;
      .navigate {
        color: #ff9c00;
        font-weight: bold;
      }
    }
  }
}

/deep/.placeholder {
  color: #ccc;
}
</style>
