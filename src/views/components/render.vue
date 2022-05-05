<script>
import { h, compile, warn } from "vue";
export default {
  render() {
    let template = this.template;
    let templates = this.recursionTem([template]);
    console.log(templates,"templates");
    return h(compile(templates), this);
  },
  props: {
    template: "",
  },
  data() {
    return {
      // 数据集
      data: {
      },
      // 元素数据对照
      dataFilt: {},
      allFun: {},
    };
  },
  methods: {
    getData(name = "a_") {
      let base = "a_";
      let { data } = this;
      return data[base + name];
    },
    getDataName(name = "a_") {
      let base = "a_";
      return base + name;
    },
    // 设定 方法, 返回 allFun 方法名
    setFun(val) {
      // val = `function testclickButton(){
      //     console.log(this, 'data1')
      // }`
      const fun = new Function(`return ${val}`)().bind(this);
      let funName = "fun_" + new Date().getTime();
      this.allFun[funName] = fun;
      return funName;
    },
    // 获取
    setAllFun(data = {}) {
      let str = "";
      for (let x in data) {
        let funStr = data[x];
        str += `@${x}="allFun.${this.setFun(funStr)}" `;
      }
      return str;
    },
    /**
     * q:处理数据
     * w:吴雨耕
     */
    regexpFun(data) {
      let copyData = JSON.parse(JSON.stringify(data)); //深拷贝正式版用lodash替换
      let JSONData = JSON.stringify(copyData);
      let pushJSONData = "";
      let reg1 = /(?<="req":){.*?}(?=)/;
      let reg2 = /"/g;
      let reg3 = /refresh/g;
      //1验证是否有req(请求)
      if (reg1.test(JSONData)) {
        let a = reg1.exec(JSONData)[0].replace(reg2, "");
        pushJSONData = JSONData.replace(reg1, a);
      } else {
        pushJSONData = JSONData;
      }
      pushJSONData = pushJSONData.replace(reg2, "'");
      return pushJSONData;
    },
    // 递归模板转换
    recursionTem(data = []) {
      let str = "";
      data.forEach((val) => {
        if (val.body && val.body.constructor == Array) {
          str += `<${val.type=='page'?'el-row':val.type=='grid'?'el-col':val.type} 
            ${val.type=='grid'?':xs="{span:24}" :sm="{span:12}" :md="{span:6}"':''}
            ${val.show? 'v-if="'+val.show+'"':''}
          >${this.recursionTem(val.body)}</${val.type=='page'?'el-row':val.type=='grid'?'el-col':val.type}>`;
        } else {
          str += `<${val.type=='page'?'el-row':val.type=='grid'?'el-col':val.type}
                            ${val.id ?'id="'+ val.id +'"':''}
                            ${val.name? 'v-model="data.a_' + val.name + '"': ""}
                            ${val.allFun ? this.setAllFun(val.allFun) : ""}
                            ${`v-bind:val="${this.regexpFun(val)}"`}
                            ${val.show? 'v-if="'+val.show+'"':''}
                            >
                        {{${val.label || ""}}}
                        </${val.type=='page'?'el-row':val.type=='grid'?'el-col':val.type}>`;
        }
      });
      return str;
    },
  },
  mounted() {

     setTimeout(() => {
         console.warn(this);
     }, 4000)
  },
};
// 递归模板 转换
</script>

<style>
</style>