<template>
  <el-select
    :placeholder="
      val.hasOwnProperty('placeholder') ? val.placeholder : '请选择'
    "
    v-show="isshow"
  >
    <el-option
      v-for="item in val.data"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.hasOwnProperty('disabled') ? item.disabled : false"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: ["val"],
  mounted() {
    this.$bus.on(this.val.id, (data) => {
      
      if (data == "show") {
        this.isshow = true;
      }
      if (data == "hidden") {
        this.isshow = false;
      }
    });
  },
  data() {
    return {
      isshow: true,
      options: [],
    };
  },
};
</script>