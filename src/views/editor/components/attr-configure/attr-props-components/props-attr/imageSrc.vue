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
			this.tempValue = this.imageSrc;
		},
		watch: {
			imageSrc(val) {
				this.tempValue = val;
			},
			tempValue() {
				this.$emit('update:imageSrc', this.tempValue);
			}
		}
	}
</script>

<style scoped>

</style>
