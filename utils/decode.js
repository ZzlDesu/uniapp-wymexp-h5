/* 封装解码token */
import jwt from 'jsonwebtoken'
import request from './request'
function decodeToken(token) {
  return new Promise(async (resolve, reject) => {
    const res = await request({
      url: '/getkey',
      method: 'GET'
    })
    const secretKey = res.key
    try {
      const decoded = jwt.verify(token, secretKey)
      resolve(decoded)
    } catch (error) {
      console.log('error,', error.message)
      reject()
    }
  })
}

export default decodeToken
