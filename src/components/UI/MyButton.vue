<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "my-button"
}
</script>

<style scoped>
.button {
    align-self: flex-end;
    background: none;
    padding: 8px 16px;
    border: 1px solid gray;
    cursor: pointer;
}

.button:hover {
    background: lightgray;
}
</style>