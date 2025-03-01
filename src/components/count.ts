//计算两个矩形之间最近的两个边的距离
import { ref } from 'vue';

export function calculateDistance(rect1: any, rect2: any) {
    // 水平方向的距离
    const horizontalDistance = Math.max(
        0, // 如果重叠，距离为0
        rect1.x - rect2.width - rect2.x, // rect1在rect2左侧
        rect2.x - rect1.width - rect1.x, // rect1在rect2右侧
    );

    // 垂直方向的距离
    const verticalDistance = Math.max(
        0, // 如果重叠，距离为0
        rect2.y - rect1.height - rect1.y, // rect1在rect2上方
        rect1.y - rect2.height - rect2.y, // rect1在rect2下方
    );
    // console.log(horizontalDistance, verticalDistance);

    // 返回水平方向和垂直方向的最小距离
    return Math.max(horizontalDistance, verticalDistance);
}
//计算两个点的中心点
export function getMidpoint(x1: any, y1: any, x2: any, y2: any) {
    const xMid = (x1 + x2) / 2;
    const yMid = (y1 + y2) / 2;
    return { x: xMid, y: yMid };
}

// 计算连接线的起点和终点
export function calculateLinePoints(rect1: any, rect2: any) {
    let start, end;
    const horizontalDistance = Math.max(
        0, // 如果重叠，距离为0
        rect1.x - rect2.width - rect2.x, // rect1在rect2左侧
        rect2.x - rect1.width - rect1.x, // rect1在rect2右侧
    );
    const verticalDistance = Math.max(
        0, // 如果重叠，距离为0
        rect2.y - rect1.height - rect1.y, // rect1在rect2上方
        rect1.y - rect2.height - rect2.y, // rect1在rect2下方
    );
    if (horizontalDistance > verticalDistance) {
        if (rect1.x + rect1.width < rect2.x) {
            // rect1的右中点
            const r1RightMid = getMidpoint(
                rect1.x + rect1.width,
                rect1.y,
                rect1.x + rect1.width,
                rect1.y + rect1.height,
            );

            if (
                r1RightMid.y <= rect2.y + rect2.height &&
                r1RightMid.y >= rect2.y
            ) {
                start = { x: r1RightMid.x, y: r1RightMid.y };
                end = { x: rect2.x, y: r1RightMid.y };
            } else if (
                r1RightMid.y >= rect2.y + rect2.height &&
                rect2.y + rect2.height >= rect1.y
            ) {
                start = { x: rect1.x + rect1.width, y: rect2.y + rect2.height };
                end = { x: rect2.x, y: rect2.y + rect2.height };
            } else if (
                r1RightMid.y <= rect2.y &&
                rect2.y <= rect1.y + rect1.height
            ) {
                start = { x: rect1.x + rect1.width, y: rect2.y };
                end = { x: rect2.x, y: rect2.y };
            } else {
                start = { x: 0, y: 0 };
                end = { x: 0, y: 0 };
            }

            // console.log('rect1在rect2左侧');
        } else {
            // rect1的左中点
            const r1LeftMid = getMidpoint(
                rect1.x,
                rect1.y,
                rect1.x,
                rect1.y + rect1.height,
            );
            if (
                r1LeftMid.y <= rect2.y + rect2.height &&
                r1LeftMid.y >= rect2.y
            ) {
                start = { x: rect2.x + rect2.width, y: r1LeftMid.y };
                end = { x: r1LeftMid.x, y: r1LeftMid.y };
            } else if (
                r1LeftMid.y >= rect2.y + rect2.height &&
                rect2.y + rect2.height >= rect1.y
            ) {
                start = { x: rect2.x + rect2.width, y: rect2.y + rect2.height };
                end = { x: r1LeftMid.x, y: rect2.y + rect2.height };
            } else if (
                r1LeftMid.y <= rect2.y &&
                rect2.y <= rect1.y + rect1.height
            ) {
                start = { x: rect2.x + rect2.width, y: rect2.y };
                end = { x: rect1.x, y: rect2.y };
            } else {
                start = { x: 0, y: 0 };
                end = { x: 0, y: 0 };
            }
            // console.log('rect1在rect2右侧');
        }
    } else {
        if (rect1.y + rect1.height < rect2.y) {
            // rect1的下中点
            const r1BottomMid = getMidpoint(
                rect1.x,
                rect1.y + rect1.height,
                rect1.x + rect1.width,
                rect1.y + rect1.height,
            );
            if (
                r1BottomMid.x <= rect2.x + rect2.width &&
                r1BottomMid.x >= rect2.x
            ) {
                // console.log('垂直重叠');
                start = { x: r1BottomMid.x, y: r1BottomMid.y };
                end = { x: r1BottomMid.x, y: rect2.y };
            } else if (
                rect2.x <= rect1.x + rect1.width &&
                r1BottomMid.x <= rect2.x
            ) {
                start = {
                    x: rect2.x,
                    y: rect2.y,
                };
                end = { x: rect2.x, y: r1BottomMid.y };
            } else if (
                rect1.x <= rect2.x + rect2.width &&
                r1BottomMid.x >= rect2.x + rect2.width
            ) {
                start = { x: rect2.x + rect2.width, y: rect2.y };
                end = { x: rect2.x + rect2.width, y: rect1.y + rect1.height };
            } else {
                start = { x: 0, y: 0 };
                end = { x: 0, y: 0 };
            }
            // console.log('rect1在rect2上方');
        } else {
            // rect1的上中点
            const r1TopMid = getMidpoint(
                rect1.x,
                rect1.y,
                rect1.x + rect1.width,
                rect1.y,
            );
            if (r1TopMid.x <= rect2.x + rect2.width && r1TopMid.x >= rect2.x) {
                start = { x: r1TopMid.x, y: r1TopMid.y };
                end = { x: r1TopMid.x, y: rect2.y + rect2.height };
            } else if (
                rect2.x <= rect1.x + rect1.width &&
                r1TopMid.x <= rect2.x
            ) {
                start = { x: rect2.x, y: rect2.y + rect2.height };
                end = { x: rect2.x, y: rect1.y };
            } else if (
                rect1.x <= rect2.x + rect2.width &&
                r1TopMid.x >= rect2.x + rect2.width
            ) {
                start = { x: rect2.x + rect2.width, y: rect2.y + rect2.height };
                end = { x: rect2.x + rect2.width, y: r1TopMid.y };
            } else {
                start = { x: 0, y: 0 };
                end = { x: 0, y: 0 };
            }
            // console.log('rect1在rect2下方');
        }
    }
    return { start, end };
}

export function getRectOverlap(
    items: any,
    currentIndex: any,
    e: any,
    distanceThreshold: any,
) {
    const current = items.value[currentIndex];
    let minDistance = Infinity; // 初始化为无穷大
    let newclosestIndex = ref<any>(0);
    let newclosestDistance = ref<any>('');
    let newclosestPosition = ref<any>({ x: 0, y: 0 });
    let newlineStart = ref<any>({ x: 0, y: 0 }); // 连接线起点
    let newlineEnd = ref<any>({ x: 0, y: 0 }); // 连接线终点
    items.value.forEach((item: any, index: any) => {
        if (index !== currentIndex) {
            // 检查是否重叠
            const isOverlapping =
                current.x + current.width >= item.x &&
                current.x <= item.x + item.width &&
                current.y + current.height >= item.y &&
                current.y <= item.y + item.height;
            if (isOverlapping) {
                // 如果重叠，距离为0
                minDistance = 0;
                newclosestIndex.value = index;
            } else {
                const distance = calculateDistance(current, item);
                if (distance < minDistance) {
                    minDistance = distance;
                    newclosestIndex.value = index;
                }
            }
        }
    });
    // 检查距离是否超过阈值
    if (minDistance > distanceThreshold.value) {
        newclosestDistance.value = '';
    } else {
        newclosestDistance.value = minDistance;
        const closestRect = items.value[newclosestIndex.value];
        const linePoints = calculateLinePoints(current, closestRect); //链接线的位置
        // getMidpoint;
        newclosestPosition.value = getMidpoint(
            linePoints.start.x,
            linePoints.start.y,
            linePoints.end.x,
            linePoints.end.y,
        );
        if (linePoints) {
            newlineStart.value = linePoints.start;
            newlineEnd.value = linePoints.end;
            // shouldShowLine.value = true;
        }
    }

    return {
        newclosestIndex,
        newclosestDistance,
        newclosestPosition,
        newlineStart,
        newlineEnd,
    };
}
