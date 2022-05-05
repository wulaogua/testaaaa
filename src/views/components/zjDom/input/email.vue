<template>
    <input type="text" v-model="domValue">
</template>

<script>
export default {
    props: {
        modelValue: { default: '' }
    },
    data () {
        return {
            domValue: this.modelValue
        }
    },
    mounted () {
    },
    watch: {
        modelValue (val) {
            this.domValue = val
        },
        domValue (val, val1) {
            if (!val || val.length<10) {
                this.$emit('update:modelValue', val)
            }else{
                this.$message.warning('长度不能超过9')
                this.domValue = val1
            }
        }
    }
}
</script>

<style>

</style>