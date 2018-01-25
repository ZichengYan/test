// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router/index.js';
import vuexStore from './store/index.js';
import api from './commonjs/api.js';
import axios from './commonjs/interceptors.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Utils from './commonjs/utils.js';
import App from './App';

Vue.use(ElementUI)

Vue.prototype.$http = axios
Vue.prototype.api = api
Vue.prototype.utils = new Utils();
Vue.config.productionTip = false


// 注册
Vue.filter('statusDic', function (value) {
    return vuexStore.state.stateDic[value];
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store: vuexStore,
    template: '<App/>',
    components: {App},
    render: h => h(App)
})


router.beforeEach((to, from, next) => {
    // console.log('vuexStore',vuexStore.state.breadcrumb);
    vuexStore.state.breadcrumb = [{name: to.name, path: to.path}];
    next();
})


