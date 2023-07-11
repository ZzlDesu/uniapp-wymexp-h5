/* 获取用户信息 */
import request from './request'
import decodeToken from './decode'

async function getUserinfo() {
  const token = uni.getStorageSync('accessToken')
  const info = await decodeToken(token)
  const res = await request({
    url: '/api/getuserinfo',
    method: 'POST',
    data: {
      userid: info.uid
    }
  })
  return res.data[0]
}

export default getUserinfo
