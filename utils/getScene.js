/* 获取场景列表 */
import request from './request'
// 获取免费场景列表
export async function getFreeList() {
  const res = await request({
    url: '/api/freelist',
    method: 'GET'
  })
  return res.data
}

// 获取付费场景列表
export async function getPaymentList() {
  const res = await request({
    url: '/api/paymentlist',
    method: 'GET'
  })
  return res.data
}
