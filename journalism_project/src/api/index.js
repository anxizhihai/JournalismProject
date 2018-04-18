import Axios from 'axios'
// 设置统一的前置url路径，调用接口时，所有的接口路径都会拼接在该路径后
Axios.defaults.baseURL = 'https://dev.apis.sh/PBXZ$DK1c'
    // 允许跨域
Axios.defaults.withCredentials = true
export default Axios