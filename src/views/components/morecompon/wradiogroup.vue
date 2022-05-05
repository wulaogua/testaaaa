<template>
  <el-radio-group>
    <el-radio-button
      v-for="i in val.data"
      :key="i.value"
      :label="i.label"
    >{{i.value}}</el-radio-button>
  </el-radio-group>
</template>

<script>
export default {
  props: ["val"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>