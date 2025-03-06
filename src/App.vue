<template>
  <div id="app">
    {{ items }}<br />
    <!-- {{ distance }}
    <div>距离{{ distance }}</div> -->

    <div
      class="parent"
      :style="{
        width: `${totalWidth}px`,
        height: `${totalHeight}px`,
      }"
    >
      <!-- 循环渲染所有连接线 -->
      <ConnectionLine
        v-for="(line, index) in allLines"
        :key="index"
        :closest-distance="line.distance"
        :line-start="line.start"
        :line-end="line.end"
        :closest-position="line.position"
        :total-width="totalWidth"
        :total-height="totalHeight"
      />
      <DraggableContainer>
        <Vue3DraggableResizable
          v-for="(item, index) in items"
          :key="index"
          :initW="item.width"
          :initH="item.height"
          v-model:x="item.x"
          v-model:y="item.y"
          v-model:w="item.width"
          v-model:h="item.height"
          v-model:active="item.active"
          :draggable="draggable"
          :resizable="resizable"
          :parent="true"
          :disabledX="false"
          :disabledW="false"
          :disabledH="false"
          :disabledY="false"
          :lockAspectRatio="false"
          classNameHandle="my-handle"
          @activated="print('activated', $event)"
          @deactivated="print('deactivated', $event)"
          @drag-start="dragStart('drag-start', $event)"
          @resize-start="print('resize-start', $event)"
          @dragging="onDragging(index, $event)"
          @resizing="print(index, $event)"
          @drag-end="draggEnd(index, $event)"
          @resize-end="resizeEnd(index, $event)"
        >
          rect {{ index + 1 }}
        </Vue3DraggableResizable>
      </DraggableContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Vue3DraggableResizable from './components/Vue3DraggableResizable';
import DraggableContainer from './components/DraggableContainer';
import ConnectionLine from './components/ConnectionLine.vue';
import { calculateDistance, calculateLinePoints } from './components/count';

let demodata = ref<any>('');
const totalWidth = ref<any>(1300);
const totalHeight = ref<any>(800);
const draggable = ref<any>(true); // 是否可拖动
const resizable = ref<any>(true); // 是否可缩放
const items = ref<any>([]); // 矩形数组
let allLines = ref<any>([]); // 所有连接线信息

const shouldShowLine = ref<boolean>(false); // 是否显示连接线
//定义距离阈值
const distanceThreshold = ref<number>(200);

onMounted(() => {
  items.value = [
    {
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      active: false,
    },
    {
      x: 300,
      y: 300,
      width: 150,
      height: 150,
      active: true,
    },
    // {
    //   x: 300,
    //   y: 300,
    //   width: 150,
    //   height: 150,
    //   active: true,
    // },
    // {
    //   x: 300,
    //   y: 300,
    //   width: 150,
    //   height: 150,
    //   active: true,
    // },
    // {
    //   x: 300,
    //   y: 300,
    //   width: 150,
    //   height: 150,
    //   active: true,
    // },
    // {
    //   x: 300,
    //   y: 300,
    //   width: 150,
    //   height: 150,
    //   active: true,
    // },
  ];
});

const print = (val: any, e: any) => {};
//更改大小后重新赋值
const resizeEnd = (currentIndex: any, e: any) => {
  nextTick(() => {
    const { x, y, w, h } = e;
    items.value[currentIndex].x = x;
    items.value[currentIndex].y = y;
    items.value[currentIndex].width = w;
    items.value[currentIndex].height = h;
  });
};
// 拖动开始
const dragStart = (val: any, e: any) => {
  //   shouldShowLine.value = false;
};
// 拖动结束
const draggEnd = (currentIndex: any, e: any) => {
  allLines.value = [];
  //   shouldShowLine.value = false;
};
//拖拽中
const onDragging = (currentIndex: any, e: any) => {
  const currentRect = {
    x: e.x,
    y: e.y,
    width: items.value[currentIndex].width,
    height: items.value[currentIndex].height,
  };

  const newLines = [];
  for (let i = 0; i < items.value.length; i++) {
    if (i !== currentIndex) {
      const otherRect = {
        x: items.value[i].x,
        y: items.value[i].y,
        width: items.value[i].width,
        height: items.value[i].height,
      };
      const { start, end } = calculateLinePoints(currentRect, otherRect);
      const distance = calculateDistance(start, end);
      const position = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2,
      };
      newLines.push({
        distance,
        start,
        end,
        position,
      });
    }
  }
  allLines.value = newLines;
};
</script>

<style lang="less" scoped>
.parent {
  position: relative;
  border: 1px solid #000;
  user-select: none;

  ::v-deep {
    .vdr-container {
      border-color: #999;
    }
  }
}

.connection-line {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
