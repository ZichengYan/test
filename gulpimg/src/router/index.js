import Vue from 'vue'
import Router from 'vue-router'

// 登陆
import login from 'components/login/login.vue';

import main from 'layouts/main.vue';
import home from 'components/home/home.vue' ; // 首页
import serviceItems from 'components/serviceItems/serviceItems.vue' ; // 服务项目
import manageMember from 'components/manageMember/manageMember.vue' ; // 会员管理
import purchaseHistory from 'components/purchaseHistory/purchaseHistory.vue' ; // 消费记录
import manageProduct from 'components/manageProduct/manageProduct.vue' ; // 商品管理
import shareZone from 'components/shareZone/shareZone.vue' ; // 共享空间

// 预约提醒
import remindAppointments from 'components/remindAppointments/remindAppointments.vue' ; // 提醒预约
import _hairdresser from 'components/remindAppointments/_hairdresser.vue' ; // 发型师预约
import _customer from 'components/remindAppointments/_customer.vue' ; // 客户预约

// 员工管理
import manageEmployee from 'components/manageEmployee/manageEmployee.vue' ; // 员工管理
import _fixedHairDresser from 'components/manageEmployee/_fixedHairDresser.vue' ; // 固定发型师
import _flowHairDresser from 'components/manageEmployee/_flowHairDresser.vue' ; // 流动发型师
import _assistant from 'components/manageEmployee/_assistant.vue' ; // 助理

// 预约记录
import appointments from 'components/appointments/appointments.vue' ; // 预约记录
import _flowHairdresserAppointments from 'components/appointments/_flowHairdresserAppointments.vue' ; // 流动发型师预约
import _customerAppointments from 'components/appointments/_customerAppointments.vue' ; // 客户预约

// 消费收银
import cashier from 'components/cashier/cashier.vue' ; // 消费收银
import _unBudget from 'components/cashier/_unAppointBudget.vue' ; // 未预约结算
import _appointBudget from 'components/cashier/_appointBudget/_appointBudget.vue' ; // 预结预算

// 小程序
import lApp from 'components/lApp/lApp.vue' ; // 小程序


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            component: login,
            name:'login'
        },
        {
            path: '/',
            name: 'main',
            redirect: '/home',
            components: {
                default: main
            },
            children: [
                {
                    name: '[{"name":"小程序","path":"/lApp"}]', // 小程序
                    path: '/lApp',
                    component: lApp
                },
                {
                    name: '[{"name":"首页","path":"/home"}]', // 首页
                    path: '/home',
                    component: home
                },
                {
                    name: '预约提醒', // 预约提醒
                    path: '/remind/',
                    // redirect: '/remind/customer',
                    component: remindAppointments,
                    children: [
                        {
                            name: '[{"name":"预约提醒","path":"/remind/hairdresser"},{"name":"流动发型师预约","path":"/remind/mobileHairdresser"}]',
                            path: 'hairdresser',
                            component: _hairdresser
                        },
                        {
                            name: '[{"name":"预约提醒","path":"/remind/customer"},{"name":"客户预约","path":"/remind/customer"}]',
                            path: 'customer',
                            component: _customer
                        }
                    ]
                },
                {
                    name: '[{"name":"服务项目","path":"/serviceItems"}]', // 服务项目
                    path: '/serviceItems',
                    component: serviceItems
                },
                {
                    name: '[{"name":"员工管理","path":"/manageEmployee"}]', // 员工管理
                    path: '/manageEmployee/',
                    redirect: '/manageEmployee/fixedHairDresser',
                    component: manageEmployee,
                    children: [
                        {
                            name: '[{"name":"员工管理","path":"/manageEmployee/fixedHairDresser"},{"name":"固定发型师","path":"/manageEmployee/fixedHairDresser"}]',// 固定发型师管理
                            path: 'fixedHairDresser',
                            component: _fixedHairDresser
                        },
                        {
                            name: '[{"name":"员工管理","path":"/manageEmployee/fixedHairDresser"},{"name":"流动发型师","path":"/manageEmployee/flowHairDresser"}]',// 流动发型师管理
                            path: 'flowHairDresser',
                            component: _flowHairDresser
                        },
                        {
                            name: '[{"name":"员工管理","path":"/manageEmployee/fixedHairDresser"},{"name":"助理","path":"/manageEmployee/assistant"}]',// 助理
                            path: 'assistant',
                            component: _assistant
                        }
                    ]
                },
                {
                    name: '[{"name":"会员管理","path":"/manageMember"}]', // 会员管理
                    path: '/manageMember',
                    component: manageMember
                },
                {
                    name: '[{"name":"消费记录","path":"/purchaseHistory"}]', // 消费记录
                    path: '/purchaseHistory',
                    component: purchaseHistory
                },
                {
                    name: '[{"name":"预约记录","path":"/appointments"}]', // 预约记录
                    path: '/appointments/',
                    redirect: '/appointments/flowHairdresserAppointments',
                    component: appointments,
                    children: [
                        {
                            name: '[{"name":"预约记录","path":"/appointments/flowHairdresserAppointments"},{"name":"流动发型师预约","path":"/appointments/flowHairdresserAppointments"}]',// 流动发型师管理
                            path: 'flowHairdresserAppointments',
                            component: _flowHairdresserAppointments
                        },
                        {
                            name: '[{"name":"预约记录","path":"/appointments/flowHairdresserAppointments"},{"name":"客户预约","path":"/appointments/customerAppointments"}]',// 客户预约
                            path: 'customerAppointments',
                            component: _customerAppointments
                        }
                    ]
                },
                {
                    name: '[{"name":"商品管理","path":"/manageProduct"}]', // 商品管理
                    path: '/manageProduct',
                    component: manageProduct
                },
                {
                    name: '[{"name":"消费收银","path":"/cashier"}]', // 消费收银
                    path: '/cashier/',
                    redirect: '/cashier/unBudget',
                    component: cashier,
                    children: [
                        {
                            name: '[{"name":"消费收银","path":"/cashier/unBudget"},{"name":"未预约结算","path":"/cashier/unBudget"}]',// 未预约结算
                            path: 'unBudget',
                            component: _unBudget
                        },
                        {
                            name: '[{"name":"消费收银","path":"/cashier/unBudget"},{"name":"预结预算","path":"/cashier/appointBudget"}]',// 预结预算
                            path: 'appointBudget',
                            component: _appointBudget
                        }
                    ]
                },
                {
                    name: '[{"name":"共享空间","path":"/shareZone"}]', // 共享空间
                    path: '/shareZone',
                    component: shareZone
                }
            ]
        }
    ]
})

