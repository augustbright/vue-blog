<template>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" >
        <option disabled value="">Choose an option</option>
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.title }}</option>
    </select>
</template>

<script lang='ts'>
export default {
    name: 'my-select',
    props: {
        options: {
            type: Array,
            default: () => []
        },
        modelValue: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>

</style>