import type { Module } from 'vuex';
import axios from 'axios';

type TPost = {
    title: string,
    body: string;
};

export default {
    state: () => ({
        posts: [] as Array<TPost>,
        isLoading: true,
        sorting: 'title' as "title" | "body",
        search: '',
        pageSize: 10,
        currentPage: 1,
        postsCount: 0,
        autoLoading: true
    }),
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, loading) {
            state.isLoading = loading;
        },
        setSorting(state, sorting) {
            state.sorting = sorting;
        },
        setSearch(state, search) {
            state.search = search;
        },
        setPageSize(state, pageSize) {
            state.pageSize = pageSize;
        },
        setCurrentPage(state, currentPage) {
            state.currentPage = currentPage;
        },
        nextPage(state) {
            state.currentPage++;
        },
        setPostsCount(state, postsCount) {
            state.postsCount = postsCount;
        },
        setAutoloading(state, autoLoading) {
            state.autoLoading = autoLoading
        }
    },
    getters: {
        filteredPosts(state) {
            return [...state.posts].filter(post => post.title.includes(state.search))
        },
        sortedPosts(state, getters) {
            return [...getters.filteredPosts].sort((post1, post2) => {
                return post1[state.sorting].localeCompare(post2[state.sorting]);
            });
        },
        isLastPage(state) {
            return state.currentPage === Math.ceil(state.postsCount / state.pageSize);
        }
    },
    actions: {
        createPost({commit, state}, post) {
            commit('setPosts', [...state.posts, post])
        },
        deletePost({commit, state}, postId) {
            commit('setPosts', state.posts.filter(post => post.id !== postId));
        },
        async fetchPosts({commit, state}) {
            try {
                commit('setLoading', true);
                const { data, headers } = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.pageSize,
                        _page: state.currentPage,
                        _sort: state.sorting
                    }
                });
                if (state.autoLoading) {
                    commit('setPosts', state.posts.concat(data));
                } else {
                    commit('setPosts', data);
                }
                commit('setPostsCount', Number(headers['x-total-count']));
            } catch (e) {
                alert(e);
            } finally {
                commit('setLoading', false);
            }
        },

        loadMore({commit, dispatch}) {
            commit('nextPage');
            dispatch('fetchPosts');
        },
    },
    namespaced: true
} as Module<any, any>;