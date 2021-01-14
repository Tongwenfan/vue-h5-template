<template>
  <div class="uploader">
    <input
      id="upload"
      ref="filePicker"
      :type="config.type"
      :capture="config.capture"
      :accept="config.accept"
      @change="fileChange"
      class="uploader-file"
    />
  </div>
</template>

<script>
// 实现拍照
// 实现上传相册
import { appSource } from "@/utils/utils";
export default {
  name: "csp-uploader",
  props: {
    config: {
      type: Object,
      default: function () {
        return {
          accept: "image/*",
          type: "file",
          capture: "camera", // camera–照相机； camcorder–摄像机 // microphone–录音
        };
      },
    },
  },
  data: function () {
    return {
      navigator: appSource(),
    };
  },
  methods: {
    Compatible() {
      // let files = document.getElementById("upload");
      let ua = navigator.userAgent.toLowerCase();
      //判断是否是苹果手机，是则是true
      let isIos = ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1;
      if (isIos) {
        // files.removeAttribute("capture");
      }
    },
    start() {
      this.Compatible();
      this.$nextTick(() => {
        // 在iOS下click()却无法触发
        // 发现通过dispathEvent()直接派发事件不受影响，
        const event = new MouseEvent("click");
        this.$refs.filePicker.dispatchEvent(event);
      });
    },
    fileChange(event) {
      let files = event.target.files;
      const maxSize = 1024 * 1024 * 20;
      if (!files.length) return;
      // 判断大于20mb 无法上传
        
      if (files[0].size > maxSize) {
            this.$csp_Toast('文件大于20MB',500)
           return;
      }
      files = Array.prototype.slice.call(files);
      // 返回文件
      this.$emit("fileChange", files);
    },
  },
};
</script>
<style lang="scss" scope>
.uploader {
  z-index: -10;
  visibility: hidden;
  .abc {
    visibility: hidden;
  }
  #upload{
    width: 100vw
  }
}
</style>
