import { createStore } from 'vuex';
import posts from './postsModule';

export default createStore({
    modules: { posts }
});