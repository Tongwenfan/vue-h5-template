<template>
  <div id="app">    
    <div v-show='isLoading' class='appLoading'>
      <van-loading  type="spinner" size="30px" color="#1989fa" />
    </div>
    
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data(){
    return {
      // isLoading: true
    }
  },
  computed: {
    ...mapState({
      isLoading (state) {
        return state.operation.isLoading
      }
    })
  }
}
</script> 
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
.appLoading{
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  background-color: rgba(0,0,0,.3);
  position: fixed;
  left:0px;
  top: 0px;
  z-index: 999999999;
  display: flex;
  justify-content: center;
  align-items: center;
}
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #ebedf0;
}
.scp_loading {
  position: absolute !important;
  z-index: 1000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  margin: auto;

}

</style>
