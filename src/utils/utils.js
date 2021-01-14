
/**
 * 
 * @description  内部标准工具库，方便以后做成标准工具库,es5可通过 Loader.XXX 方法  或者 ses6+ import { xxx }  解耦
 * @author tongwenfan
 * @returns function
 */
/* eslint-disable no-undef */
(function(global, factory) {
  // 定义工具库，通过umd规则，可以amd 和 import 加载
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
    ? define(["exports"], factory)
    : factory((global.Loader = {}));
})(window, function(exports) {
  "use strict";
  /* eslint-disable no-undef */
  // 方法写在下面 ，然后挂载到exports上面
  // 通过原型准确返回类型
  function quickType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
  }
  // 判断设备os
  function appSource() {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS) {
      return "ios";
    } else {
      return "andriod";
    }
  }
  // 判断是否在微信小程序里
  function iswx(){
    return navigator.userAgent.match(/miniprogram/i) === 'miniprogram' || window.__wxjs_environment === 'miniprogram'
  }
  

  // 深拷贝
  function deepCopy(target) {
    let copyed_objs = []; //此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
    function _deepCopy(target) {
      if (typeof target !== "object" || !target) {
        return target;
      }
      for (let i = 0; i < copyed_objs.length; i++) {
        if (copyed_objs[i].target === target) {
          return copyed_objs[i].copyTarget;
        }
      }
      let obj = {};
      if (Array.isArray(target)) {
        obj = []; //处理target是数组的情况
      }
      copyed_objs.push({ target: target, copyTarget: obj });
      Object.keys(target).forEach((key) => {
        if (obj[key]) {
          return;
        }
        obj[key] = _deepCopy(target[key]);
      });
      return obj;
    }
    return _deepCopy(target);
  }

  // 抓取url 参数
  function GetQueryValue1(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var parms = window.location.href.split("?")[1];
    if (parms === undefined) {
      return;
    }
    var r = parms.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  // 弹窗 解析object
  function JsonAlert(obj) {
    return alert(JSON.stringify(obj));
  }

  // SessionStorage操作
  function ChangeSessionStorage() {
    return {
      set: function(key, val) {
        sessionStorage.setItem(key, val);
        return this;
      },
      get: function(key) {
        return sessionStorage.getItem(key);
      },
      del: function(key) {
        sessionStorage.removeItem(key);
        return this;
      },
    };
  }

  // 使用utf-8字符集解析base64字符串 
function atou(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

  exports.GetQueryValue1 = GetQueryValue1;
  exports.quickType = quickType;
  exports.appSource = appSource;
  exports.isWx = iswx;
  exports.deepCopy = deepCopy;
  exports.ChangeSessionStorage = ChangeSessionStorage;
  exports.JsonAlert = JsonAlert;
  exports.atou =atou;
});
