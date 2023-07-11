<!-- 注册页面 -->
<template>
  <view class="reg-container">
    <div class="body">
      <div class="img-box">
        <img src="http://pic.yupoo.com/zzl-desu/37a938a7/68eba8aa.png" />
      </div>
      <h2>微荧幕体验馆</h2>
      <form @submit="submitHandler">
        <input
          type="text"
          placeholder="请输入用户名"
          placeholder-class="placeholder"
          v-model.trim="userName"
          @blur="userNameHandler"
        />
        <input
          type="text"
          password
          placeholder="请输入密码"
          placeholder-class="placeholder"
          v-model.trim="passWord"
          @blur="passWordHandler"
        />
        <input
          type="text"
          password
          placeholder="请输入确认密码"
          placeholder-class="placeholder"
          v-model.trim="confirmPassWord"
        />
        <p class="tips">{{ tips }}</p>
        <button form-type="submit">注册</button>
      </form>
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
      confirmPassWord: '',
      tips: ''
    }
  },

  methods: {
    async submitHandler() {
      if (this.userName === '') {
        this.tips = '用户名为空！'
      } else if (this.passWord === '') {
        this.tips = '密码为空！'
      } else if (this.passWord !== this.confirmPassWord) {
        this.tips = '两次输入的密码不一致！'
      } else {
        // 用户名密码合法 添加到数据库
        this.tips = ''
        const res = await request({
          url: '/api/register',
          method: 'POST',
          data: {
            username: this.userName,
            password: this.passWord
          }
        })
        console.log(res)
        if (res.status === 1) {
          this.tips = '用户名已被占用！'
        } else {
          this.userName = ''
          this.passWord = ''
          this.confirmPassWord = ''

          uni.showToast({
            title: '注册成功！'
          })

          setTimeout(() => {
            uni.hideToast()
            // 跳转到登录页面
            uni.navigateTo({
              url: '/pages/login/login'
            })
          }, 1500)
        }

        // uni.request({
        //   url: 'http://localhost:8000/api/register',
        //   method: 'POST',
        //   data: {
        //     username: this.userName,
        //     password: this.passWord
        //   },
        //   success: (res) => {
        //     if (res.data.status === 1) {
        //       this.tips = '用户名已被占用！'
        //     } else {
        //       this.userName = ''
        //       this.passWord = ''
        //       this.confirmPassWord = ''

        //       uni.showToast({
        //         title: '注册成功！'
        //       })

        //       setTimeout(() => {
        //         uni.hideToast()
        //         // 跳转到登录页面
        //         uni.navigateTo({
        //           url: '/pages/login/login'
        //         })
        //       }, 1500)
        //     }
        //   }
        // })
      }
    },

    // 校验用户名
    userNameHandler() {
      const userNameReg = /^[a-zA-Z][a-zA-Z0-9_]{2,11}$/
      if (!userNameReg.test(this.userName)) {
        this.tips = '用户名必须以字母开头且长度在2-12之间'
      } else {
        this.tips = ''
      }
    },

    // 校验密码
    passWordHandler() {
      const passWordReg = /^[a-zA-Z0-9]{6,16}$/
      if (!passWordReg.test(this.passWord)) {
        this.tips = '密码必须是字母或数字，长度在6-16位！'
      } else {
        this.tips = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #ffbb4d;

  .body {
    position: relative;
    width: 85%;
    height: 70%;
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
      margin-top: 40rpx;
      background-image: linear-gradient(to right, #ffc568e6, #ffbb4d);
      color: #fff;
      border-radius: 100rpx;
    }
  }
}

/deep/.placeholder {
  color: #ccc;
}
</style>
