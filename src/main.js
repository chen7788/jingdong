// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import ant from 'ant-design-vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI  from 'element-ui';

Vue.config.productionTip = false
Vue.use(ant)
Vue.use(ElementUI )
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
