<template>
    <!-- 连接线 -->
    <svg
        v-if="showLine"
        class="connection-line"
        :width="totalWidth"
        :height="totalHeight"
    >
        <line
            :x1="lineStart.x"
            :y1="lineStart.y"
            :x2="lineEnd.x"
            :y2="lineEnd.y"
            stroke="red"
            stroke-width="1"
        />
    </svg>

    <!-- 距离显示 -->
    <div v-if="showDistance" class="distance-label" :style="distanceStyle">
        {{ closestDistance }}
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    closestDistance: {
        type: [Number, String],
        default: 0,
    },
    lineStart: {
        type: Object,
        default: () => ({ x: 0, y: 0 }),
    },
    lineEnd: {
        type: Object,
        default: () => ({ x: 0, y: 0 }),
    },
    closestPosition: {
        type: Object,
        default: () => ({ x: 0, y: 0 }),
    },
    totalWidth: {
        type: Number,
        default: 0,
    },
    totalHeight: {
        type: Number,
        default: 0,
    },
});

const showLine = computed(
    () =>
        props.closestDistance !== '' &&
        props.closestDistance !== 0 &&
        props.lineStart.x !== 0,
);

const showDistance = computed(
    () =>
        props.closestDistance !== '' &&
        props.closestDistance !== 0 &&
        props.lineStart.x !== 0,
);

const distanceStyle = computed(() => ({
    top: `${props.closestPosition.y}px`,
    left: `${props.closestPosition.x}px`,
}));
</script>

<style scoped>
.connection-line {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}

.distance-label {
    position: absolute;
    background-color: rgba(255, 255, 255, 1);
    color: red;
    font-size: 10px;
    transform: translate(-50%, -50%);
    pointer-events: none;
    white-space: nowrap;
}
</style>
