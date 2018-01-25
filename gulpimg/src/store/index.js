import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../commonjs/interceptors.js'
import api from '../commonjs/api.js'

Vue.use(Vuex)
let store = new Vuex.Store({
    state: {
        breadcrumb: [{path: '/home', name: '首页'}],
        stateDic: {},// 字典
        tableData: [],// 列表数据
        payWay: {},//支付方式
        goods: [], // 商品列表
    },
    mutations: {
        statusDic(state) {
            axios.get(api.getStatusDic).then(function (data) {
                state.stateDic = data.data;
            })
        },
        getPayway(state) {
            axios.get(api.payway).then(function (data) {
                state.payWay = data.data;
            })
        },
        getGoods(state) {
            axios.get(api.getGoods, {}).then((response) => {
                state.goods = response.data;
            })
        },
    },
    actions: {
        commonConf({commit}) {
            commit('getPayway')
            commit('getGoods')
        }
    }
})
store.commit('statusDic');
// store.commit('getPayway');
store.dispatch('commonConf')
export default store
