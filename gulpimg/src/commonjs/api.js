let url = location.href;
let rootPath = '';
const devApi = {

    // 字典-----start
    getStatusDic: "/mock/statusDic.json",
    // 字典-----end

    /*--------------------分割线------------------------*/

    // 用户中心-----start
    logout: "/mock/common.json",//登出
    edit: "/mock/common.json",//登出
    // 用户中心-----end

    /*--------------------分割线------------------------*/

    // 访问店铺-----start

    // 访问店铺-----end

    /*--------------------分割线------------------------*/

    // 预约提醒-----start
    //list 接口同预约记录
    remindAppointemtAct: "/mock/remindAppointemtAct.json",// 通过 / 不通过
    // 预约提醒-----end

    /*--------------------分割线------------------------*/

    // 首页-----start
    indexQuery: "/mock/indexQuery.json",
    indexChart: "/mock/indexChart.json",
    // 首页-----end

    /*--------------------分割线------------------------*/

    // 服务项目-----start
    serviceList: "/mock/serviceList.json",// 列表查询
    serviceDel: "/mock/serviceDel.json",// 删除
    serviceAddOrEdit: "/mock/serviceAddOrEdit.json",// 添加/编辑
    // 服务项目-----end

    /*--------------------分割线------------------------*/

    // 员工管理-----start
    fixedHairdresserList: "/mock/fixedHairdresserList.json",//固定发型师列表
    employeeDel: "/mock/common.json",//删除固定发型师
    flowHairdresserList: "/mock/flowHairdresserList.json",// 流动发型师列表
    assistantList: "/mock/assistantList.json",// 助理列表
    employeeEditOrAdd: "/mock/common.json",// 添加编辑
    fixedHairdresserDetail: "/mock/fixedHairdresserDetail.json",// 固定发型师获取详细信息
    fixedHairConf: "/mock/fixedHairConf.json",// 添加服务项目配置
    // 员工管理-----end

    /*--------------------分割线------------------------*/

    // 会员管理-----start
    memberAddOrEdit: "/mock/memberAddOrEdit.json",
    memberList: "/mock/memberList.json",
    memberCharge: "/mock/memberCharge.json",
    memberDel: "/mock/memberDel.json",
    // 会员管理-----end

    /*--------------------分割线------------------------*/

    // 消费记录-----start
    payrecord: '/mock/payrecord.json',
    // 消费记录-----end

    /*--------------------分割线------------------------*/

    // 预约记录-----start
    appointmentsRecord: "/mock/appointmentsRecord.json",
    // 预约记录-----end

    /*--------------------分割线------------------------*/

    // 共享空间-----start
    shareZoneList: "/mock/shareZoneList.json",// 列表查询
    shareZoneDel: "/mock/shareZoneDel.json",// 删除
    shareZoneAddOrEdit: "/mock/shareZoneAddOrEdit.json",// 添加/编辑
    // 共享空间-----end

    /*--------------------分割线------------------------*/

    // 消费收银-----start
    payway: "/mock/payway.json",
    balance: "/mock/balance.json",
    getServiceItems: "/mock/serviceItems.json",
    getGoods: "/mock/goods.json",
    addOrder: "/mock/addOrder.json",
    pay: "/mock/pay.json",
    orderDetail: "/mock/orderDetail.json",
    // 消费收银-----end

    /*--------------------分割线------------------------*/

    // 商品管理-----start

    // 商品管理-----end

    /*--------------------分割线------------------------*/

}

const proApi = {

    // 字典-----start
    getStatusDic: rootPath + "/admin/order/getStatusDic",
    // 字典-----end

    /*--------------------分割线------------------------*/

    // 用户中心-----start
    logout: rootPath + "/admin/Login/logout",//登出
    edit: rootPath + "/admin/Adminuser/edit",//信息修改
    // 用户中心-----end

    /*--------------------分割线------------------------*/

    // 访问店铺-----start

    // 访问店铺-----end

    /*--------------------分割线------------------------*/

    // 预约提醒-----start
    remindAppointemtAct: rootPath + "/admin/order/edit",// 通过 / 不通过
    // 预约提醒-----end

    /*--------------------分割线------------------------*/

    // 首页-----start
    indexQuery: rootPath + "/admin/index/query",
    indexChart: rootPath + "/admin/index/graph",
    // 首页-----end

    /*--------------------分割线------------------------*/

    // 服务项目-----start
    shareZoneList: rootPath + "/admin/gxkj/list",// 列表查询
    shareZoneDel: rootPath + "/admin/gxkj/del",// 删除
    shareZoneAddOrEdit: rootPath + "/admin/gxkj/addEdit",// 添加/编辑
    // 服务项目-----end

    /*--------------------分割线------------------------*/

    // 员工管理-----start
    fixedHairdresserList: rootPath + "/admin/yg/list",// 固定发型师列表
    hairdresserDel: rootPath + "/admin/yg/delfxs",// 发型师删除
    flowHairdresserList: rootPath + "/admin/yg/ldfxslist",// 流动发型师
    flowHairdresserDel: rootPath + "/admin/yg/ldfxslist",// 流动发型师
    employeeEditOrAdd: rootPath + "/admin/yg/addEdit",// 员工添加修改
    fixedHairdresserDetail: rootPath + "/admin/yg/getFxsInfo",// 固定发型师获取详细信息
    fixedHairConf: rootPath + "/admin/yg/getfwxm",// 添加服务项目配置

    // 员工管理-----end

    /*--------------------分割线------------------------*/

    // 会员管理-----start
    memberAddOrEdit: rootPath + "/admin/user/addEdit",
    memberList: rootPath + "/admin/user/list",
    memberCharge: rootPath + "/admin/user/charge",
    memberDel: rootPath + "/admin/user/del",
    // 会员管理-----end

    /*--------------------分割线------------------------*/

    // 消费记录-----start
    payrecord: rootPath + "/admin/order/payrecord",
    // 消费记录-----end

    /*--------------------分割线------------------------*/

    // 预约记录-----start
    appointmentsRecord: rootPath + "/admin/order/index",
    // 预约记录-----end

    /*--------------------分割线------------------------*/

    // 共享空间-----start
    serviceList: rootPath + "/admin/fwxm/list",// 列表查询
    serviceDel: rootPath + "/admin/fwxm/del",// 删除
    serviceAddOrEdit: rootPath + "/admin/fwxm/addEdit",// 添加/编辑
    // 共享空间-----end

    /*--------------------分割线------------------------*/

    // 消费收银-----start
    payway: rootPath + "/admin/order/payway",
    balance: rootPath + "/admin/user/getYe",
    getServiceItems: rootPath + "/admin/fwxm/index",
    getGoods: rootPath + "/admin/goods/index",
    addOrder: rootPath + "/admin/order/add",
    pay: rootPath + "/admin/order/pay",
    orderDetail: rootPath + "/admin/order/detail",
    // 消费收银-----end

    /*--------------------分割线------------------------*/

    // 商品管理-----start

    // 商品管理-----end

    /*--------------------分割线------------------------*/


}

const api = (url.indexOf('localhost') == -1) ? proApi : devApi

export default api

