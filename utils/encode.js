/* 对token进行base64编码 */
import { Base64 } from 'js-base64'
function _encode(tokenStorage) {
  const token = localStorage.getItem(tokenStorage)
  const encoded = Base64.encode(`${token}:`)
  return `Basic ${encoded}`
}

export default _encode
