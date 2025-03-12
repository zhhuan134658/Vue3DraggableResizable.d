<template>
    <div id="app">
        <!-- {{ items }}<br /> -->
        <!-- {{ allLines }} -->
        <!-- <div>距离{{ distance }}</div> -->
        <div @click="addnum">1111</div>
        <div class="parent" :style="{
            width: `${totalWidth}px`,
            height: `${totalHeight}px`,
        }">
            <!-- 循环渲染所有连接线 -->
            <ConnectionLine v-for="(line, index) in allLines" :key="index" :closest-distance="line.distance"
                :line-start="line.start" :line-end="line.end" :closest-position="line.position"
                :total-width="totalWidth" :total-height="totalHeight" />
            <DraggableContainer :adsorbRows="deList" :adsorbCols="deList" :referenceLineVisible="true">
                <Vue3DraggableResizable v-for="(item, index) in items" :key="index" :initW="item.width"
                    :OFFSET="stepNum" :initH="item.height" v-model:x="item.x" v-model:y="item.y" v-model:w="item.width"
                    v-model:h="item.height" v-model:active="item.active" :draggable="draggable" :resizable="resizable"
                    :parent="true" :disabledX="false" :disabledW="false" :disabledH="false" :disabledY="false"
                    :lockAspectRatio="false" classNameHandle="my-handle" @activated="activated(index, $event)"
                    @deactivated="print('deactivated', $event)" @drag-start="dragStart(index, $event)"
                    @resize-start="print('resize-start', $event)" @dragging="onDragging(index, $event)"
                    @resizing="resizing(index, $event)" @drag-end="draggEnd(index, $event)"
                    @resize-end="resizeEnd(index, $event)">
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
import {
    calculateDistance,
    calculateLinePoints,
    getStartAndEnd,
} from './components/count';

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
        {
            x: 300,
            y: 300,
            width: 150,
            height: 150,
            active: true,
        },
        {
            x: 300,
            y: 300,
            width: 150,
            height: 150,
            active: true,
        },
        {
            x: 300,
            y: 300,
            width: 150,
            height: 150,
            active: true,
        },
        {
            x: 300,
            y: 300,
            width: 150,
            height: 150,
            active: true,
        },
    ];
    for (let i = 0; i < 100; i++) {
        deList.value.push(i * 20);
    }
});
const stepNum = ref<number>(50);
const addnum = () => {
    stepNum.value = 100
}
const deList = ref<any>([]);
const print = (val: any, e: any) => { };

//更改大小后重新赋值
const resizeEnd = (currentIndex: any, e: any) => {
    nextTick(() => {
        const { x, y, w, h } = e;
        items.value[currentIndex].x = x;
        items.value[currentIndex].y = y;
        items.value[currentIndex].width = w;
        items.value[currentIndex].height = h;
    });

    allLines.value = getStartAndEnd(currentIndex, e, items);


};
//缩放中
const resizing = (currentIndex: any, e: any) => {
    nextTick(() => {
        const { x, y, w, h } = e;
        items.value[currentIndex].x = x;
        items.value[currentIndex].y = y;
        items.value[currentIndex].width = w;
        items.value[currentIndex].height = h;
    });

    allLines.value = getStartAndEnd(currentIndex, e, items);


};
//激活时
const activated = (currentIndex: any, e: any) => {
    allLines.value = [];

    //   shouldShowLine.value = true;
};
// 拖动开始
const dragStart = (val: any, e: any) => {
    //   shouldShowLine.value = false;
};
// 拖动结束
const draggEnd = (currentIndex: any, e: any) => {
    //   allLines.value = [];
    //   shouldShowLine.value = false;
};
//拖拽中
const onDragging = (currentIndex: any, e: any) => {
    console.log(e);

    //   const currentRect = items.value[currentIndex];

    //   const newLines = ref<any>([]);
    //   items.value.forEach((item: any, i: any) => {
    //     if (i !== currentIndex) {
    //       // 检查是否重叠
    //       const isOverlapping =
    //         currentRect.x + currentRect.width >= item.x &&
    //         currentRect.x <= item.x + item.width &&
    //         currentRect.y + currentRect.height >= item.y &&
    //         currentRect.y <= item.y + item.height;

    //       if (!isOverlapping) {
    //         const otherRect = items.value[i];
    //         const { start, end } = calculateLinePoints(currentRect, otherRect);
    //         const distance = calculateDistance(start, end);
    //         const position = {
    //           x: (start.x + end.x) / 2,
    //           y: (start.y + end.y) / 2,
    //         };
    //         newLines.value.push({
    //           distance,
    //           start,
    //           end,
    //           position,
    //         });
    //       }
    //     }
    //   });

    allLines.value = getStartAndEnd(currentIndex, e, items);
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
