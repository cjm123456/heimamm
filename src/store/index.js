
// 1 导包
import Vue from 'vue'
import Vuex from 'vuex'
// 2 使用
Vue.use(Vuex)
// 3 实例化 仓库
const store = new Vuex.Store({
    state:{
        username:'',
        avatar:''
    },
    mutations:{
        setUserInfo(state,userInfo){
            state.username=userInfo.username,
            state.avatar=userInfo.avatar
        }
    }
})
// 4 导出
export default store
