import type { Directive } from "vue";

export default {
    mounted(el) {
        el.focus();
    },
    name: 'focus'
} as Directive<HTMLElement>