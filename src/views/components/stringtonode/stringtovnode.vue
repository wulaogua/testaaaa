<template>
  <div class="page">
    <template v-for="(item, index) in mobileHtml" :key="index">
      <renderview :item="item" :index="index"></renderview>
    </template>
  </div>
</template>
<script>
/**
 * @desc 字符转DOM的基本代码(demo)-主文件
 * @author 吴雨耕
 * @date 2022/03/04
 * @version 0.1
 */
import { compile, h } from "vue";
export default {
  components: {
    renderview: {
      render() {
        return h(
          compile(this.$parent.$data.mobileHtml[this.index]),
          this.$parent
        );
      },
      props: ["index"],
    },
  },
  watch: {},
  created() {
    this.allfun();
  },
  mounted() {
    console.warn(this.allfunData);
  },
  methods: {
    allfun(val) {
      let a = "function testclickButton(data){alert(data)}";
      const fun = new Function(`return ${a}`)();
      this.allfunData["testclickButton"] = fun;
    },
  },

  data() {
    return {
      mobileHtml: [
        '<input label="姓名" v-model="fields.username"><span>{{fields.username}}</span>',
        '<div><button @click="allfunData.testclickButton(fields.username)">点击</button></div>',
      ],
      fields: {
        username: "XXXXXXX",
        email: "YYYYYYY",
        website: "WWWWWWW",
      },
      allfunData: {},
    };
  },
};
</script>
<style>
</style>