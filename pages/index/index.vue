<template>
  <view>
    <!-- 头部 -->
    <header>
      <img src="http://pic.yupoo.com/zzl-desu/7a3fc4cd/e9a9ed8a.jpg" />
    </header>
    <!-- 主体 -->
    <main>
      <div class="left" @click="leftHandler">
        <img src="http://pic.yupoo.com/zzl-desu/5f9dbfbc/de6f3462.png" />
        <span>场景定制</span>
      </div>
      <div class="right" @click="rightHandler">
        <img src="http://pic.yupoo.com/zzl-desu/c677caec/74f4de8a.png" />
        <span>投稿成品</span>
      </div>
    </main>
    <!-- 底部 -->
    <footer @click="aboutHandler">关于体验馆</footer>
  </view>
</template>

<script>
import _encode from '../../utils/encode'
import request from '../../utils/request'
export default {
  data() {
    return {}
  },
  onLoad() {},
  methods: {
    // 跳转到场景定制页面
    async leftHandler() {
      const res = await request({
        url: '/api/verify',
        method: 'POST',
        header: {
          Authorization: _encode('accessToken')
        }
      })
      if (res.status === 1) {
        if (res.errCode === 10001) {
          uni.showToast({
            title: '请先登录',
            icon: 'none',
            duration: 2000
          })
          setTimeout(() => {
            uni.navigateTo({
              url: '/pages/login/login'
            })
          }, 1500)
        } else if (res.errCode === 10002) {
          // token已过期
          const res = await request({
            url: '/api/refresh',
            method: 'POST',
            header: {
              Authorization: _encode('refreshToken')
            }
          })
          uni.setStorageSync('accessToken', res.accessToken)
        }
      } else {
        uni.navigateTo({
          url: '/pages/vr/vr'
        })
      }
    },

    // 跳转到投稿成品页面
    rightHandler() {
      uni.navigateTo({
        url: '/pages/contribute/contribute'
      })
    },

    // 跳转到关于页面
    aboutHandler() {
      uni.navigateTo({
        url: '/pages/about/about'
      })
    }
  }
}
</script>

<style lang="less" scoped>
view {
  display: flex;
  flex-direction: column;
  align-items: center;

  header,
  main,
  footer {
    width: 93%;
  }

  main,
  footer {
    height: 27vh;
    border-radius: 50rpx;
    margin-top: 30rpx;
  }

  header {
    text-align: center;
    img {
      border-radius: 50rpx;
      width: 100%;
    }
  }

  main {
    display: flex;
    justify-content: space-around;
    background-color: #fed480;

    .left,
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .left img,
    .right img {
      width: 250rpx;
    }
  }

  footer {
    background-color: #ffbb4e;
    color: #fff;
    text-align: center;
    line-height: 25vh;
    font-size: 100rpx;
    font-weight: bold;
  }
}
</style>
