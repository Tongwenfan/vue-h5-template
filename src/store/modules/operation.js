
const operation = {
    namespaced: true ,
    state:()=>(
        {
          isLoading: false, // 全局loading状态
         
        }
    ),
    mutations : {
      changeisLoading(state, data) {
        state.isLoading = data
      },
   
  },
  actions : {
    
   
  }
}

export default  operation; 
