<template>
    <div id="app" class="app">
        <router-view></router-view>
        <!--<router-view name="b"></router-view>-->
    </div>
</template>

<script>
    export default {
        name: 'app',
    }
</script>

<style lang="scss">
    @import "assets/scss/main.scss";

    .app {
        height: 100%;
    }
</style>
