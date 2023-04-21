<template>
    <h3>Posts from Store</h3>
    <div class="toolbar">
        <my-button class="add" @click="addModalVisible = true">Add Post</my-button>
        <div class="spacer" />
        <my-select :modelValue="sorting" @update:modelValue="setSorting" :options="sortOptions" class="sort" />
    </div>
    <my-modal v-model:visible="addModalVisible">
        <post-form @create="createPost" />
    </my-modal>
    <my-input v-focus :modelValue="search" @update:modelValue="setSearch" placeholder="Search" />
    <div>
        <input type="checkbox" :modelValue="autoLoading" update:modelValue="setAutoloading" id="autoloading">
        <label for="autoloading">Autoloading</label>
    </div>
    <post-list v-if="shouldRenderPostsList" @delete="deletePost" :posts="sortedPosts" />
    <list-paginator v-if="!autoLoading" :currentPage="currentPage" :pageSize="pageSize" :totalCount="postsCount"
        @update:currentPage="setCurrentPage" @update:pageSize="setPageSize" />
    <div v-intersection="handleIntersection" ref="posts-end" class="posts-end" />
    <div v-if="isLoading" class="loading">Loading...</div>
</template>

<script lang="ts">
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import ListPaginator from '@/components/ListPaginator.vue';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
    components: {
        PostForm, PostList, ListPaginator
    },
    name: 'App',
    data() {
        return {
            addModalVisible: false,
            sortOptions: [
                {
                    value: 'title',
                    title: 'title'
                },
                {
                    value: 'body',
                    title: 'body'
                }
            ],
        }
    },
    computed: {
        ...mapState({
            posts: 'posts/posts',
            isLoading: 'posts/isLoading',
            sorting: 'posts/sorting',
            search: 'posts/search',
            pageSize: 'posts/pageSize',
            currentPage: 'posts/currentPage',
            postsCount: 'posts/postsCount',
            autoLoading: 'posts/autoLoading'
        }),
        ...mapGetters({
            sortedPosts: 'posts/sortedPosts'
        }),

        shouldRenderPostsList() {
            if (this.autoLoading) {
                return this.posts.length > 0 || !this.isLoading;
            } else {
                return !this.isLoading;
            }
        },
    },
    methods: {
        ...mapMutations({
            setSorting: 'posts/setSorting',
            setSearch: 'posts/setSearch',
            setPageSize: 'posts/setPageSize',
            setCurrentPage: 'posts/setCurrentPage',
            setAutoloading: 'posts/setAutoloading'
        }),
        ...mapActions({
            createPostInStore: 'posts/createPost',
            deletePost: 'posts/deletePost',
            fetchPosts: 'posts/fetchPosts',
            loadMore: 'posts/loadMode'
        }),

        createPost(post) {
            this.createPostInStore(post);
            this.addModalVisible = false;
        },

        handleIntersection() {
            if (!this.isLoading && this.autoLoading && !this.isLastPage) {
                this.loadMore();
            }
        }
    },
    mounted() {
        this.fetchPosts();
    }
}
</script>

<style scoped>
.loading {
    align-self: center;
}

.toolbar {
    display: flex;
}

.add {
    align-self: flex-start;
}

.sort {
    justify-self: flex-end;
}

.posts-end {
    height: 30px;
    visibility: hidden;
}
</style>