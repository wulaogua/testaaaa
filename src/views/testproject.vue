<template>
  <div>
    <div
      v-for="(i, index) in list"
      :key="'i' + index"
      class="test"
      @mousedown="handleMouseDownOnElement($event, index)"
      :style="
        getCommonStyle({
          left: i.x,
          top: i.y,
        })
      "
    >
      {{ i.x }}
    </div>
  </div>
</template>
<script>
import editorProjectConfig from "@/views/editor/DataModel.js";
export default {
  data() {
    return {
      getCommonStyle: editorProjectConfig.getCommonStyle,
      list: [
        { x: 0, y: 0 },
        { x: 100, y: 100 },
      ],
    };
  },
  methods: {
    handleMouseDownOnElement(e, index) {
      let move = (moveEvent) => {
        // !#zh 移动的时候，不需要向后代元素传递事件，只需要单纯的移动就OK
        moveEvent.stopPropagation();
        moveEvent.preventDefault();
        this.list[index].x = moveEvent.clientX;
        this.list[index].y = moveEvent.clientY;
        //console.warn(moveEvent.clientY, moveEvent.clientX);
      };
      let up = () => {
        document.removeEventListener("mousemove", move, true);
        document.removeEventListener("mouseup", up, true);
      };
      document.addEventListener("mousemove", move, true);
      document.addEventListener("mouseup", up, true);
    },
  },
};
</script>
<style lang="scss" scoped>
.test {
  background: #000;
  width: 100px;
  height: 100px;
  color: aliceblue;
  position: absolute;
  display: inline-block;
}
</style>