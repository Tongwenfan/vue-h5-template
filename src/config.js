let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
    // 本地环境
   BASE_URL = 'http://10.8.10.193' // 代理
  
}
if (process.env.NODE_ENV === 'production') {
    // 生产环境
    BASE_URL = 'https://smcs.crb.cn/api'
  
}
if (process.env.NODE_ENV === 'uat') {
    // 测试环境
    BASE_URL = 'https://smcsuatmobile.crb.cn/mobile/api/mobile'
  
}

/* eslint-disable */
const CONFIG = {
    env: process.env.NODE_ENV,
    base_url: BASE_URL,
}
export default CONFIG;

