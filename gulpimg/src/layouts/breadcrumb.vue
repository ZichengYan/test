<template>
    <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in pathVal" :key="item.a" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "breadcrumb",
        data() {
            return {}
        },
        computed: {
            pathVal(a) {
                let defaultActive = this.$route;
                if(!defaultActive.name){
                    return {name:'首页',path:'/'};
                }
                this.$store.state.breadcrumb = JSON.parse(defaultActive.name);
                return this.$store.state.breadcrumb;
            }
        },
        mounted: () => {

        }
        /*props: {
            path: {
                type: Array
            }
        },*/
    }
</script>

<style lang="scss" scoped>
    .vforContainer {

        display: inline-block;
    }

    .breadcrumb {
        max-width: 270px;
        display: inline-block;
        vertical-align: middle;
        & /deep/ span {
            color: #fff !important;
        }
    }
</style>
