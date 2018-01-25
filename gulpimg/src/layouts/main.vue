<template>
    <el-container>
        <el-aside width="200px">
            <sidebar></sidebar>
        </el-aside>
        <el-container>
            <el-header style="height: 53px">
                <headers></headers>
            </el-header>
            <ExtensionToolBar></ExtensionToolBar>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Sidebar from 'layouts/sidebar.vue';
    import Headers from 'layouts/header.vue';
    import ExtensionToolBar from 'common/extensionToolBar.vue'

    export default {
        name: 'main',
        components: {Sidebar, Headers, ExtensionToolBar}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .el-header {
        background-color: $header-background-color;
        border-left: 1px solid #efeff4;
    }

    .sidebar {
        background-color: $header-background-color;
        overflow-x: hidden;
    }

    .el-container {
        width: 100%;
        height: 100%;
    }

</style>
