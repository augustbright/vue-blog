<template>
    <div class="post">
        <div class="body">
            <div><strong>Title:</strong>{{ post.title }}</div>
            <div><strong>Description:</strong>{{ post.body }}</div>
        </div>
        <div class="side">
            <my-button @click="$emit('delete')">Delete</my-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
}
</script>

<style scoped>
.post {
    border: 1px solid gray;
    padding: 8px;
    display: flex;    
}
.body {
    flex: 1 1 auto;
}

.side {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    border-left: dotted 1px lightgray;
    padding-left: 10px;
}
</style>