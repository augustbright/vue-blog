import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Posts from '@/pages/Posts.vue';
import About from '@/pages/About.vue';

export default createRouter({
    routes: [
        {
            path: '/',
            component: Home            
        },
        {
            path: '/posts',
            component: Posts
        },
        {
            path: '/about',
            component: About
        }
    ],
    history: createWebHashHistory()
})