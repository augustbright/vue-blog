<template>
    <form class="form" @submit.prevent>
        <h4>Add Post</h4>
        <my-input v-focus v-model="title" type="text" placeholder="Title"/>
        <my-input v-model="description" type="text" placeholder="Description"/>
        <my-button @click="createPost">Add</my-button>
    </form>
</template>

<script>
export default {
    data: () => ({
        title: '',
        description: ''
    }),
    methods: {
        createPost() {
            this.$emit('create', {
                id: Date.now(),
                title: this.title,
                body: this.description
            })
            this.title = '';
            this.description = '';
        }
    }
}
</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    border: 1p solid gray;
}

</style>