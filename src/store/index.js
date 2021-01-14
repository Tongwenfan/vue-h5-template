import Vue from 'vue'
import Vuex from 'vuex'
import operation from './modules/operation'
Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
   
    operation,
    
  }
})



