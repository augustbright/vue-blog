<template>
    <div class="paginator">
        <my-select :modelValue="pageSize" @update:modelValue="changePageSize" :options="pageOptions" />
        <div class="pages">
            <div v-for="page in pagesCount" :key="page" class="page" :class="{
                'current': page === currentPage
            }" @click="$emit('update:currentPage', page)">{{ page }}</div>
        </div>
        <div class="total">Total number of posts: <em>{{ totalCount }}</em></div>
    </div>
</template>

<script lang='ts'>
export default {
    props: {
        totalCount: {
            type: Number,
            default: 0
        },
        modelValue: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 10
        },
        currentPage: {
            type: Number,
            default: 1
        },
        pageOptions: {
            type: Array,
            default: () => [
                { value: 10, title: '10' },
                { value: 20, title: '20' },
                { value: 100, title: '100' }
            ]
        }
    },
    computed: {
        pagesCount() {
            return Math.ceil(this.totalCount / this.pageSize);
        }
    },
    methods: {
        changePageSize(newPage: string) {
            this.$emit('update:pageSize', Number(newPage));
        }
    }
}
</script>

<style scoped>
.paginator {
    display: flex;
    column-gap: 10px;
    align-items: center;
}

.pages {
    display: flex;
    column-gap: 5px;
    align-items: center;
}

.page {
    padding: 4px;
    border: solid 1px gray;
    cursor: pointer;
}

.page.current {
    border: solid 2px black;
}
</style>