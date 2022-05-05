<template>
    <input type="text" v-model="domValue">
</template>

<script>
export default {
    props: {
        value: {}
    },
    data () {
        return {
            domValue: this.value
        }
    },
    watch: {
        value (val) {
            this.domValue = val
        },
        domValue (val) {
            this.$emit('setValue', val)
        }
    },
    model: { prop: 'value', event: 'setValue' }
}
</script>

<style>

</style>