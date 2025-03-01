<template>
    <div id="app">
        {{ items }}<br />
        {{ closestPosition }}
        <div>距离{{ closestDistance }}</div>

        <div class="parent" :style="{
            width: `${totalWidth}px`,
            height: `${totalHeight}px`,
        }">
            <ConnectionLine :closest-distance="closestDistance" :line-start="lineStart" :line-end="lineEnd"
                :closest-position="closestPosition" :total-width="totalWidth" :total-height="totalHeight" />
            <DraggableContainer>
                <Vue3DraggableResizable v-for="(item, index) in items" :key="index" :initW="item.width"
                    :initH="item.height" v-model:x="item.x" v-model:y="item.y" v-model:w="item.width"
                    v-model:h="item.height" v-model:active="item.active" :draggable="draggable" :resizable="resizable"
                    :parent="true" :disabledX="false" :disabledW="false" :disabledH="false" :disabledY="false"
                    :lockAspectRatio="false" classNameHandle="my-handle" @activated="print('activated', $event)"
                    @deactivated="print('deactivated', $event)" @drag-start="dragStart('drag-start', $event)"
                    @resize-start="print('resize-start', $event)" @dragging="onDragging(index, $event)"
                    @resizing="print(index, $event)" @drag-end="draggEnd(index, $event)"
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
// 新增导入
import ConnectionLine from './components/ConnectionLine.vue';
import {
    calculateDistance,
    calculateLinePoints,
    getMidpoint,
    getRectOverlap,
} from './components/count';
let demodata = ref<any>('');
const totalWidth = ref<any>(1300);
const totalHeight = ref<any>(800);
const draggable = ref<any>(true); // 是否可拖动
const resizable = ref<any>(true); // 是否可缩放
const items = ref<any>([]); // 矩形数组
let closestDistance = ref<any>('');
let closestIndex = ref<any>(''); // 距离拖动元素最近矩形的索引
let closestPosition = ref<any>({
    x: 0,
    y: 0,
}); // 数字的显示位置
let lineStart = ref<any>({ x: 0, y: 0 }); // 连接线起点
let lineEnd = ref<any>({ x: 0, y: 0 }); // 连接线终点

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
            x: 500,
            y: 500,
            width: 100,
            height: 100,
            active: true,
        },
    ];
});
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
};
// 拖动开始
const dragStart = (val: any, e: any) => {
    shouldShowLine.value = false;
};
// 拖动结束
const draggEnd = (currentIndex: any, e: any) => {
    closestDistance.value = '';
    shouldShowLine.value = false;
};
//拖拽中
const onDragging = (currentIndex: any, e: any) => {
    console.log('currentIndex', e);

    const {
        newclosestIndex,
        newclosestDistance,
        newclosestPosition,
        newlineStart,
        newlineEnd,
    } = getRectOverlap(items, currentIndex, e, distanceThreshold);
    closestIndex = newclosestIndex;
    closestDistance = newclosestDistance;
    closestPosition = newclosestPosition;
    lineStart = newlineStart;
    lineEnd = newlineEnd;
};
</script>
<style lang="less" scoped>
.parent {
    // position: absolute;
    // top: 100px;
    // left: 200px;
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
