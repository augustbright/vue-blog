<template>
    <nav class="nav">
        <div class="logo" @click="$router.push('/')">VUUUEE</div>
        <div class="links">
            <my-button>
                <router-link to="/posts">Posts</router-link>
            </my-button>
            <my-button>
                <router-link to="/about">About</router-link>
            </my-button>
        </div>
    </nav>
</template>

<script lang='ts'>
export default {

}
</script>

<style scoped>
.nav {
    padding: 20px;
    border-bottom: solid 1px gray;
    display: flex;
    justify-content: space-between;
}

.logo {
    cursor: pointer;
}

.links {
    display: flex;
    column-gap: 10px;
    align-items: center;
}
</style>