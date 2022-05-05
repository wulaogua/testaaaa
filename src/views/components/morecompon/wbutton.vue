<template>

    <button @click="buttonClick">
      {{ val.label }}
    </button>

</template>

<script>
import { warn } from "@vue/runtime-core";
export default {
  props: ["val"],
  data() {
    return {
      clickFun: {},
    };
  },
  created() {},
  mounted() {
    this.funselect();
  },
  methods: {
    funselect() {
      if (
        this.val.hasOwnProperty("onEvent") &&
        this.val.onEvent.hasOwnProperty("click")
      ) {
        this.val.onEvent.click.actions.forEach((item) => {
          this.clickFun[item.componentId] = {
            fundata: (value,value1) => {
              this.$bus.emit(value, value1);
            },
            data1: item.componentId,
            data2:item.actionType
          };
        });
      }
    },
    buttonClick() {
      if (
        this.val.hasOwnProperty("onEvent") &&
        this.val.onEvent.hasOwnProperty("click")) 
        {
        for (const key in this.clickFun) {
          this.clickFun[key].fundata(this.clickFun[key].data1,this.clickFun[key].data2);
        }
      }
    },
  },
};
</script>

