<template>
    <site-navigation></site-navigation>
    <div class="app">        
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import SiteNavigation from '@/components/SiteNavigation.vue';
export default {
    components: {
        SiteNavigation
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.spacer {
    flex: 1 0 0;
}
</style>

<style scoped>
.app {
    padding: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}
</style>