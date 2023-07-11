/* 确认并跳转到订单 */
import getUserinfo from './getUserinfo'
import request from './request'
function confirmOrder(type, index) {
  uni.showModal({
    title: '提示',
    content: '确认选择此场景吗？',
    success: async (res) => {
      if (res.confirm) {
        // 生成订单并跳转到订单
        const userinfo = await getUserinfo()

        const res = await request({
          url: '/api/order',
          method: 'POST',
          data: {
            userid: userinfo.user_id,
            sceneid: index,
            scenetype: type
          }
        })

        if (res.status === 0) {
          uni.showToast({
            title: '选择成功!',
            duration: 2000
          })
          // 跳转到订单页面
          setTimeout(() => {
            uni.navigateTo({
              url: '/pages/order/order'
            })
          }, 1000)
        }
      }
    }
  })
}
export default confirmOrder
