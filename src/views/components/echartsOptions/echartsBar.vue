<template>
  <div
    class="echartsclass"
    v-show="isshow"
    :style="val.options"
    ref="echarts1"
  ></div>
</template>

<script>
import { allrequest } from "@/request/request.js";
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { BarChart, LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import tools from "./tools.js";
import { warn } from "@vue/runtime-core";
echarts.use([
  GridComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);
let myChart = {};
export default {
  data() {
    return {
      option: {},
      isshow: true,
      authdata: {},
    };
  },
  props: {
    val: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {},
  mounted() {
    this.setOptionsFunb();

    this.$bus.on(this.val.id, (data) => {
      if (typeof data == "object") {
        console.warn(data);
        this.authdata = data;
        this.refresh(this.val.axiosdata, this.authdata);
      }
      if (data == "reload") {
        this.refresh(this.val.axiosdata, this.authdata);
      }
      if (data == "show") {
        this.isshow = true;
      }
      if (data == "hidden") {
        this.isshow = false;
      }
    });
  },
  computed: {
    requestData() {
      const { val } = this;
      return val;
    },
  },
  watch: {
    requestData: {
      handler(n, o) {
        if (!/-load/g.test(n.id)) {
          if (
            JSON.stringify(n.axiosdata.req) != JSON.stringify(o.axiosdata.req)
          ) {
            this.refresh(n.axiosdata,this.authdata);
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    setOptionsFunb() {
      let chartDom = this.$refs.echarts1;
      myChart = echarts.init(chartDom);
      this.option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        grid: {
          left: "20%",
          right: "20%",
          bottom: "0%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [100, 200, 150, 280, 320, 180, 230],
            type: "bar",
          },
        ],
      };
      if (this.val.hasOwnProperty("echartsOptions")) {
        this.option = tools.objFor(this.val.echartsOptions, this.option);
      }
      if (
        this.val.hasOwnProperty("onEvent") &&
        this.val.onEvent.hasOwnProperty("click")
      ) {
        let that = this;
        myChart.on("click", function (event) {
          that.val.onEvent.click.actions.forEach((item) => {
            let value1 = {};
            value1[item.key] = item.select == "x" ? event.name : event.value;
            that.$bus.emit(item.componentId, value1);
          });
        });
      }

      this.option && myChart.setOption(this.option);
    },
    refresh(req, authreq = {}) {
      let reqdata = tools.objFor(authreq,req.req);
      let data = {
        options: {
          url: req.url,
          method: req.method,
        },
        data: reqdata,
      };
      allrequest(data).then((res) => {
        this.option.series[0].data = res.data.data;
        myChart.setOption(this.option);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.echartsclass {
  width: 200px;
  height: 200px;
  display: inline-block;
}
</style>