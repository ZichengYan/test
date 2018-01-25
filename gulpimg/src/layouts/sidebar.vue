<template>
    <div class="sidebar">
        <div class="usrBox">
            <div class="usrPhoto">
                <img src="../assets/images/imgFace.jpg" alt="">
            </div>
            <h3>共享美业后台管理系统</h3>
        </div>
        <div class="lApp">
            <router-link to="/lApp" class="lAppBtn">小程序</router-link>
        </div>
        <el-row class="tac">
            <el-col :span="24">
                <el-menu
                    :default-active="activeMenuIndex"
                    :default-openeds="menu.defaultOpeneds"
                    :unique-opened="menu.uniqueOpened"
                    :menu-trigger="menu.menuTrigger"
                    :router="menu.router"
                    @select="handleSelect"
                    @open="handleOpen"
                    @close="handleClose"
                    class="el-menu-vertical-demo">
                    <el-menu-item index="/home">首页</el-menu-item>
                    <el-menu-item index="/serviceItems">服务项目</el-menu-item>
                    <el-menu-item index="/manageEmployee">员工管理</el-menu-item>
                    <el-menu-item index="/manageMember">会员管理</el-menu-item>
                    <el-menu-item index="/purchaseHistory">消费记录</el-menu-item>
                    <el-menu-item index="/appointments">预约记录</el-menu-item>
                    <el-menu-item index="/manageProduct">商品管理</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                usrPhoto: 'assets/',
                menu: {
                    backgroundColor: false, // 菜单的背景色（仅支持 hex 格式）	string	—	#ffffff
                    textColor: false, // 菜单的文字颜色（仅支持 hex 格式）	string	—	#2d2f33
                    activeTextColor: false, // 当前激活菜单的文字颜色（仅支持 hex 格式）	string	—	#409EFF
                    defaultActive: '/smsWeather1', // 当前激活菜单的 index	string	—	—
                    defaultOpeneds: [], // 当前打开的sub-menu的 key 数组	Array	—	—
                    uniqueOpened: true, // 是否只保持一个子菜单的展开	boolean	—	false
                    menuTrigger: 'hover', // 子菜单打开的触发方式(只在 mode 为 horizontal 时有效)	string	—	hover
                    router: true, // 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转	boolean	—	false
                }
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath)
            },
            handleSelect(index) {
                // debugger;
                // this.activeMenuIndex();
                // console.log(this.$store.state);
            },
        },
        computed: {
            activeMenuIndex() {
                // debugger
                return `/${this.$route.path.split('/')[1]}`;
            },
        }
    }
</script>
<style lang="scss" scoped>

    .el-menu {
        border-right: 0 none;
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;
        background-color: inherit;
    }

    .sidebar {
        background-color: $sidebar-background-color;
        color: $sidebar-color;
        position: absolute;
        width: 200px;
        left: 0;
        top: 0;
        height: 100%;
        @include box-sizing;
        user-select: none;
        h3 {
            text-align: center;
        }
        & > > > li {
            padding-left: 30px !important;
        }
        h3 {

        }
        .el-menu-item {
            border-left: 4px solid transparent;
            color: $sidebar-color;
            padding-left: 30px !important;
            &:focus,
            &:hover {
                border-left: 4px solid $sidebar-background-hover-focus-border-color;
                color: inherit;
                outline: 0;
                background-color: $sidebar-background-hover-focus-color;
            }
            &.is-active {
                border-left: 4px solid $sidebar-background-hover-focus-border-color;
                color: $sidebar-active-color;
                background-color: $sidebar-background-hover-focus-color;
            }
        }
    }

    .usrBox {
        margin-bottom: 20px;
        width: 100%;
    }

    .usrPhoto {
        width: 76px;
        height: 76px;
        overflow: hidden;
        margin: 20px auto;
        border-radius: 50%;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .lApp {
        text-align: center;
        padding-bottom: 10px;
        .lAppBtn {
            width: 102px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            background-color: #fff;
            border-radius: 4px;
            background-color: #878d99;
            border-color: #878d99;
            display: inline-block;
        }
    }
</style>


















