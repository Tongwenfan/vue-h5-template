import axios from "axios";
import { Toast } from "vant";
import CONFIG from "@/config.js";
import qs from "qs";
import store from '@/store'



const _config = {
  baseURL: CONFIG.base_url,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
};
const instance = axios.create(_config);
// loading 队列 ,匹配多个接口触发。
let loadingArr = []
instance.interceptors.request.use(
  (config) => {
    // 添加队列 开启
    //  后续需要你们手动添加到
    store.commit('operation/changeisLoading', true)
    loadingArr.push(1)
    let _token = sessionStorage.getItem("token");
    config.headers.Authorization = _token;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//响应拦截器即异常处理
instance.interceptors.response.use(
  (response) => {
     // 删除队列
    loadingArr.splice(0,1)
    if (!loadingArr.length) {
      setTimeout(()=>{
        store.commit('operation/changeisLoading', false)
      },500)
     
    }
    if (response.data && response.data.code) {
      switch (response.data.code) {
        case 200:
          response.data.result !== undefined ? response.data.result : response.data.result = {}
          return Promise.resolve(response.data.result);
        case 500:
          Toast({
            message: response.data.message,
            icon: require("../assets/icon_ic_toast_r.png"),
          });
          return Promise.reject(response);

        case 404:
          Toast({
            message: "参数错误",
            icon: require("../assets/icon_ic_toast_r.png"),
          });
          return Promise.reject(response);
        case 401:
          Toast({
            message: "未认证",
            icon: require("../assets/icon_ic_toast_r.png"),
          });
          return Promise.reject(response);
        case 403:
          Toast({
            message: "未授权",
            icon: require("../assets/icon_ic_toast_r.png"),
          });
          return Promise.reject(response);
      }
    }
  },
  (err) => {
    loadingArr.splice(0,1)
    if (!loadingArr.length) {
      setTimeout(()=>{
        store.commit('operation/changeisLoading', false)
        loadingArr = []
      },3000)
    }
    Toast({
      message: `连接到服务器失败`,
      icon: require("../assets/icon_ic_toast_r.png"),
    });
    return err.response;
  }
);

// 使用 cancel token 取消请求
// 记录token 后续在catch阶段，根据message处理
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance({
      method: "POST",
      url,
      data: data,

      cancelToken: source.token,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装from_post请求
 * 针对 请求头 application/x-www-form-urlencoded
 * @param url
 * @param data
 * @returns {Promise}
 */

export function from_post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance({
      method: "POST",
      url,
      data: qs.stringify(data),

      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      cancelToken: source.token,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

