<template>
    <div class="app">
        <h1>My Vue Blog</h1>
        <div class="toolbar">
            <my-button class="add" @click="addModalVisible = true">Add Post</my-button>
            <div class="spacer" />
            <my-select v-model="sorting" :options="sortOptions" class="sort" />
        </div>
        <my-modal v-model:visible="addModalVisible">
            <post-form @create="createPost" />
        </my-modal>
        <my-input v-model="search" placeholder="Search" />
        <div>
            <input type="checkbox" v-model="autoLoading" id="autoloading">
            <label for="autoloading">Autoloading</label>
        </div>
        <post-list v-if="shouldRenderPostsList" @delete="deletePost" :posts="sortedPosts" />
        <list-paginator v-if="!autoLoading" v-model:currentPage="currentPage" v-model:pageSize="pageSize"
            :totalCount="postsCount" />
        <div ref="posts-end" class="posts-end" />
        <div v-if="isLoading" class="loading">Loading...</div>
    </div>
</template>

<script lang="ts">
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import ListPaginator from '@/components/ListPaginator.vue';
import axios from 'axios';

type TPost = {
    title: string,
    body: string;
};

export default {
    components: {
        PostForm, PostList, ListPaginator
    },
    name: 'App',
    data() {
        return {
            posts: [] as Array<TPost>,
            addModalVisible: false,
            isLoading: true,
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
            sorting: 'title' as "title" | "body",
            search: '',
            pageSize: 10,
            currentPage: 1,
            postsCount: 0,
            autoLoading: true
        }
    },
    computed: {
        filteredPosts() {
            return [...this.posts].filter(post => post.title.includes(this.search))
        },
        sortedPosts() {
            return [...this.filteredPosts].sort((post1, post2) => {
                return post1[this.sorting].localeCompare(post2[this.sorting]);
            });
        },
        shouldRenderPostsList() {
            if (this.autoLoading) {
                return this.posts.length > 0 || !this.isLoading;
            } else {
                return !this.isLoading;
            }
        },
        isLastPage() {
            return this.currentPage === Math.ceil(this.postsCount / this.pageSize);
        }
    },
    watch: {
        pageSize() {
            this.fetchPosts();
        },
        currentPage() {
            this.fetchPosts();
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
            this.addModalVisible = false;
        },
        deletePost(postId) {
            this.posts = this.posts.filter(post => post.id !== postId);
        },
        async fetchPosts() {
            try {
                this.isLoading = true;
                const { data, headers } = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: this.pageSize,
                        _page: this.currentPage,
                        _sort: this.sorting
                    }
                });
                if (this.autoLoading) {
                    this.posts = this.posts.concat(data);
                } else {
                    this.posts = data;
                }
                this.postsCount = Number(headers['x-total-count']);
            } catch (e) {
                alert(e);
                this.isLoading = false;
            } finally {
                this.isLoading = false;
            }
        },

        loadMore() {
            this.currentPage++;
        }
    },
    mounted() {
        this.fetchPosts();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !this.isLoading && this.autoLoading && !this.isLastPage) {
                    this.loadMore();
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 1
        });

        observer.observe(this.$refs['posts-end'] as Element);
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
.loading {
    align-self: center;
}

.app {
    padding: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
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