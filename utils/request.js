/* 封装uni.request */
function request(options) {
  const baseURL = 'http://103.151.217.190:3000'
  const url = baseURL + options.url
  const requestConfig = { ...options, url }

  return new Promise((resolve, reject) => {
    uni.request({
      ...requestConfig,
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export default request
