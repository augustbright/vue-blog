<template>
    <div v-if="posts.length > 0">
        <div class="list">
            <h1>Posts</h1>
            <transition-group name="posts-list">
                <post-item v-for="post in posts" :key="post.id" :post="post" @delete="$emit('delete', post.id)" />
            </transition-group>
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

.posts-list-item {}

.posts-list-enter-active,
.posts-list-leave-active {
    transition: all 0.2s ease;
}
.posts-list-enter-from,
.posts-list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.posts-list-move {
    transition: transform 0.5s ease-in-out;
}
</style>