<template>
  <div class="page">
    <div>
      <input type="text" v-model="data.a_code" ref="sdada"/>
      <wbutton
        :val="{
          label: '刷新',
          type: 'button',
          id: 'b_001',
          onEvent: {
            click: {
              actions: [
                {
                  actionType: 'reload',
                  componentId: 'echarts-reload',
                },
              ],
            },
          },
        }"
      ></wbutton>
    </div>
    <!--  
    <template v-for="(item, index) in mobileHtml" :key="item">
      <renderview :item="1" :data="item" :index="index"></renderview>
    </template> 
    -->
    <echarts-bar
      ref="echarts-load"
      v-bind:val="{
        label: 'bar',
        type: 'echarts-bar',
        id: 'echarts-load',
        axiosdata: {
          url: '/member/json/resdata.json',
          method: 'get',
          req: {
            code: data.a_code,
          },
        },
      }"
    />
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
      props: {
        // item: { default: '' },
        index: { default: 0 },
        data: { default: "" },
      },

      render() {
        return h(compile(this.data), this.$parent);
      },
      // props: ['item', 'index']
    },
  },
  watch: {},
  data() {
    return {
      mobileHtml: [],
      data1: 0,
      data: {
        a_code: "",
      },
      fields: {},
      allfunData: {},
      axiosdata: {
        url: "http://dasdasdasdasdad",
        method: "post",
        req: {
          code: () => {
            return this.data1;
          },
          time: "data.a_time",
        },
        res: {
          data: "resdata",
        },
      },
    };
  },
  created() {
    this.allfun();
  },
  mounted() {
    console.warn(this.$refs);
    this.mobileHtml = [
      '<input label="姓名" v-model="fields.username"><span>{{fields.username}}</span>',
      '<div><button @click="allfunData.testclickButton(fields.username)">点击</button></div>',
      '<div><el-button @click="allfunData.testclickButton(fields.username)">caocoaocaocaoocaoacoa点击</el-button></div>',
      '<testdom :options="{ data: data1 }" />',
    ];
  },
  methods: {
    allfun(val) {
      let a = "function testclickButton(data){alert(data)}";
      const fun = new Function(`return ${a}`)();
      this.allfunData["testclickButton"] = fun;
    },
    testclcik() {
      // {url:'http://daqwe13123',method:'post',req:"{code:data.a_code}"}
      //{"url":"http://dasdasdasdasdad","method":"post","req":{code:code,time:time},"res":{"data":"resdata"}}
      /*  regexpFun(data){
        let copyData = JSON.parse(JSON.stringify(data));
        let JSONData=JSON.stringify(copyData);
        let reg1 = /"req":{.*?},/;
        let reg2 = /"/g;
        let a = reg1.exec(JSONData)[0].replace(reg2,'')
        console.warn(a,'aaaaaaaaaa');
    }, */
      //  ${val.axiosdata ? `v-bind:axiosdata="${this.recursionTem(val.axiosdata)}"`: ""}>
      // ${val.hasOwnProperty("axiosdata")? `v-bind:axiosdata="${this.regexpFun(val)}"`: ""}
      this.data1 += 1;
    },
  },
};
</script>
<style>
</style>