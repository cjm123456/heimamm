import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router/index'
// 导入 store
import store from './store/index'
// 导入 时间过滤器
import './filters/timeFilter'


// 导入element 组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

// 挂载到 vue实例
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
