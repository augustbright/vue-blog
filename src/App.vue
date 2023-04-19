<template>
    <div class="app">
        <h1>My Vue Blog</h1>
        <post-form @create="createPost" />
        <post-list @delete="deletePost" :posts="posts" />
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';

export default {
    components: {
        PostForm, PostList
    },
    name: 'App',
    data() {
        return {
            posts: [
                { id: 1, title: "Javascript 1", description: "Javascript description 1 " },
                { id: 2, title: "Javascript 2", description: "Javascript description 2 " },
                { id: 3, title: "Javascript 3", description: "Javascript description 3 " },
            ],
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
        },
        deletePost(postId) {
            this.posts = this.posts.filter(post => post.id !== postId);
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

</style>