<template>
  <div class="home" ref="home">
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
    <div class="item1"></div>
  </div>
</template>

<script lang="ts">
/**
 * @desc 选择功能基本代码(demo)
 * @author 吴雨耕
 * @date 2022/03/03
 * @version 0.1
 */
import { warn } from "@vue/runtime-core";
import { Options, Vue } from "vue-class-component";
@Options({
  components: {},
  data() {
    return {
      allNode: [],
    };
  },
  created() {},
  mounted() {
    this.fun();
  },
  methods: {
    getID(val: string) {
      return document.getElementById(val);
    },
    fun() {
      let wId = "w";
      let index = 0;
      let startX = 0,
        startY = 0;
      let flag = false;
      let retcLeft = "0px",
        retcTop = "0px",
        retcHeight = "0px",
        retcWidth = "0px";
      let that = this;

      //鼠标按下
      document.onmousedown = (e) => {
        flag = true;
        try {
          let evt = e;
          let scrollTop =
            document.body.scrollTop || document.documentElement.scrollTop;
          let scrollLeft =
            document.body.scrollLeft || document.documentElement.scrollLeft;
          startX = evt.clientX + scrollLeft;
          startY = evt.clientY + scrollTop;
          that.allNode = that.$refs.home.childNodes;
          let div = document.createElement("div");
          div.id = wId;
          div.className = "div";
          div.style.left = startX + "px";
          div.style.top = startY + "px";
          div.style.position = "absolute";
          div.style.border = "1px dashed #d1cece";
          that.$refs.home.appendChild(div);
        } catch (e) {
          //alert(e);
        }
      };
      //鼠标拿起
      document.onmouseup = () => {
        try {
          let div = that.getID(wId);
          div.style.left = retcLeft;
          div.style.top = retcTop;
          div.style.width = retcWidth;
          div.style.height = retcHeight;
          that.allNode.forEach((item: any) => {
            if (item.id != "w") {
              if (that.collide(div.getBoundingClientRect(), item.getBoundingClientRect())) {
                item.style.background = "red";
              } else {
                item.style.background = "#000";
              }
            }
          });
          //  that.$refs.home.removeChild(div);
        } catch (e) {
          //alert(e);
        }
        flag = false;
      };
      //鼠标移动
      document.onmousemove = function (e) {
        if (flag) {
          try {
            let evt = e;
            let scrollTop =
              document.body.scrollTop || document.documentElement.scrollTop;
            let scrollLeft =
              document.body.scrollLeft || document.documentElement.scrollLeft;
            retcLeft =
              (startX - evt.clientX - scrollLeft > 0
                ? evt.clientX + scrollLeft
                : startX) + "px";
            retcTop =
              (startY - evt.clientY - scrollTop > 0
                ? evt.clientY + scrollTop
                : startY) + "px";
            retcHeight = Math.abs(startY - evt.clientY - scrollTop) + "px";
            retcWidth = Math.abs(startX - evt.clientX - scrollLeft) + "px";
            that.getID(wId).style.left = retcLeft;
            that.getID(wId).style.top = retcTop;
            that.getID(wId).style.width = retcWidth;
            that.getID(wId).style.height = retcHeight;
          } catch (e) {
            //alert(e);
          }
        }
      };
    },
    collide(rect1: any, rect2: any): boolean {
      const maxX: number = Math.max(rect1.x + rect1.width,rect2.x + rect2.width);
      const maxY: number = Math.max(rect1.y + rect1.height,rect2.y + rect2.height);
      const minX: number = Math.min(rect1.x, rect2.x);
      const minY: number = Math.min(rect1.y, rect2.y);
      if (maxX - minX <= rect1.width-10 + rect2.width-10 &&maxY - minY <= rect1.height-10 + rect2.height-10) {
        return true;
      } else {
        return false;
      }
    },
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
}
.item1 {
  height: 120px;
  width: 60px;
  background: #000;
  display: inline-block;
  margin: 5px;
}
</style>
