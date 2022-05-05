<template>
  <div class="litegraph-page">
    <div class="litegraph-canvas" id="dag-canvas"></div>
  </div>
</template>

<script>
import { Canvas } from "butterfly-dag";
import { setdata } from "./assets/js/setdata.js";
import "butterfly-dag/dist/index.css";
export default {
  name: "App1",
  components: {},
  data() {
    return {
      canvas: {},
    };
  },
  props: {
    linkageData: {
      type: Array,
      default: () => {
        return [
          {
            title: "标题", //切片标题
            cardid: "wodiaoo", //切片id
            //输入端
            in: [
              {
                endpoint: "grayDom_0",
                label: "left_y_axis",
              },
              {
                endpoint: "grayDom_1",
                label: "left_y_axis",
              },
              {
                endpoint: "grayDom_2",
                label: "button_pressed",
              },
            ],
            //输出端
            out: [
              {
                endpoint: "grayDom_left_0",
                label: "left_x_axis",
              },
            ],
          },
          {
            title: "标题2", //切片标题
            cardid: "wodiaoo1", //切片id
            //输入端
            in: [
              {
                endpoint: "grayDom_0",
                label: "left_y_axis",
              },
            ],
            //输出端
            out: [
              {
                endpoint: "grayDom_1",
                label: "left_y_axis",
              },
              {
                endpoint: "grayDom_2",
                label: "button_pressed",
              },
              {
                endpoint: "grayDom_left_0",
                label: "left_x_axis",
              },
            ],
          },
        ];
      },
    },
  },
  methods: {
    getdata() {
      let pushdata = setdata(this.linkageData);
      this.componentDidMount(pushdata);
    },

    componentDidMount(buffData) {
      let root = document.getElementById("dag-canvas");
      this.canvas = new Canvas({
        root: root,
        disLinkable: true, // 可删除连线
        linkable: true, // 可连线
        draggable: true, // 可拖动
        zoomable: true, // 可放大
        moveable: true, // 可平移
        theme: {
          edge: {
            shapeType: "AdvancedBezier",
          },
        },
      });
      this.canvas.draw(buffData, () => {
        this.canvas.setGridMode(true, {
          isAdsorb: false, // 是否自动吸附,默认关闭
          theme: {
            shapeType: "circle", // 展示的类型，支持line & circle
            gap: 20, // 网格间隙
            background: "rgba(0, 0, 0, 0.65)", // 网格背景颜色
            circleRadiu: 1.5, // 圆点半径
            circleColor: "rgba(255, 255, 255, 0.8)", // 圆点颜色
          },
        });
      });
    },
  },
  mounted() {
    this.getdata();
  },
};
</script>

<style lang="less">
@import "./assets/css/index.less";
</style>