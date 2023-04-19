<template>
    <div v-if="posts.length > 0">
        <div class="list">
            <h1>Posts</h1>
            <div v-for="post in posts" :key="post.id">
                <post-item :post="post" @delete="$emit('delete', post.id)" />
            </div>
        </div>
    </div>
    <div v-else>
        <h1>No Posts</h1>
    </div>
</template>

<script>
import PostItem from '@/components/PostItem.vue';

export default {
    components: {
        PostItem
    },
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
};
</script>

<style scoped>
.list {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
}
</style>