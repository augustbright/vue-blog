import type { Directive } from "vue";

export default {
    mounted(el, binding) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    binding.value();
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 1
        });

        observer.observe(el);

    },
    name: 'intersection'
} as Directive<Element, () => void>;
