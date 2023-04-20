<template>
    <div class="backdrop" v-if="visible" @click="$emit('update:visible', false)">
        <div class="content" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'my-modal',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);

    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    padding: 20px;
    background: white;
    border-radius: 20px;
    box-shadow: black 0 0 10px;
    min-width: 600px;
}
</style>