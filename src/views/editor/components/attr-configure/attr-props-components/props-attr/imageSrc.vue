<template>
  <el-form-item label="图片：">
    <imageSelect v-model:url="tempValue" />
  </el-form-item>
</template>

<script>
	import imageSelect from '@/views/editor/components/components/image-select'
	export default {
		name: "attr-qk-imageSrc",
		props: {
			modelValue: { default: '' },
			imageSrc: String
		},
		components: {
			imageSelect
		},
		data() {
			return {
				tempValue: ''
			}
		},
		mounted() {
			console.log(this.imageSrc, 'aabbccddee')
			let val = this.modelValue.imageSrc || this.imageSrc
			this.tempValue = val;
		},
		watch: {
			imageSrc(val) {
				this.tempValue = val;
			},
			tempValue() {
				if (this.imageSrc !== undefined) {
					this.imageSrc = this.tempValue
				}
				if (this.modelValue.imageSrc != undefined) {
					this.modelValue.imageSrc = this.tempValue
				}
				// this.$emit('update:imageSrc', this.tempValue);
			}
		}
	}
</script>

<style scoped>

</style>
