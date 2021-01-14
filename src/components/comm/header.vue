<template>
  <van-nav-bar
    :title="title === undefined ? this.$router.history.current.name : title"
    class="csp_header van-hairline--bottom"
    z-index="100"
    left-arrow
    @click-left="onClickLeft"
  />
</template>

<script>
import { isWx } from "@/utils/utils";
export default {
  name: "csp_header",
  props: {
    title: {
      type: String,
    },
  },
  data: function () {
    return {};
  },
  methods: {
    onClickLeft() {
     
      if (this.$lastURL !== null) {
        this.$router.replace({ path: this.$lastURL });
      } 
      else {
         console.log(this.$router.history.current);
        /* eslint-disable */
        // 返回到wx小程序 或者返回到 润工作
        //  wx.miniProgram.switchTab({url:'/pages/work/work'})
        let iswx = isWx();
        if (iswx) {
          console.log('wx');
          wx.miniProgram.navigateBack();
        }
        if (!iswx && window.h5sdk !== undefined) {
           console.log('run');
          window.h5sdk.ready(function () {
            window.h5sdk.biz.navigation.close({
              onSuccess: function (result) {
                console.log(result);
              },
            });
          });
        }
      }
    },
  },
};
</script>
<style lang="scss">
.csp_header {
  width: 100%;
  height: 64px !important;
  background: #004c97 !important;
  .van-nav-bar__title {
    color: #fff;
    font-size: 17px;
    font-weight: 500;
  }
  .van-nav-bar__left {
    .van-icon {
      color: #fff;
    }
  }
  &::after {
    border: none !important ;
  }
}
</style>
