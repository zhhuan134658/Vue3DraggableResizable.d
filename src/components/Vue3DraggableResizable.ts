// 导入 Vue 3 的核心 API 和其他工具函数
import { defineComponent, ref, toRef, h, inject } from 'vue';
import type { Ref } from 'vue';

import {
  initDraggableContainer, // 初始化可拖拽容器的逻辑
  watchProps, // 监听 props 变化并更新状态
  initState, // 初始化组件状态
  initParent, // 初始化父容器相关逻辑
  initLimitSizeAndMethods, // 初始化尺寸限制和相关方法
  initResizeHandle, // 初始化调整大小的把手逻辑
} from './hooks';
// @ts-ignore
import '../components/index.css'; // 引入组件的样式文件
import { getElSize, filterHandles, IDENTITY } from './utils'; // 工具函数
import type {
  UpdatePosition, // 更新位置的类型定义
  GetPositionStore, // 获取位置存储的类型定义
  ResizingHandle, // 调整大小把手的类型定义
  ContainerProvider, // 容器提供者的类型定义
  SetMatchedLine, // 设置匹配线的类型定义
} from './types';

// 定义所有可用的调整大小把手
export const ALL_HANDLES: ResizingHandle[] = [
  'tl', // 左上角
  'tm', // 顶部中间
  'tr', // 右上角
  'ml', // 左侧中间
  'mr', // 右侧中间
  'bl', // 左下角
  'bm', // 底部中间
  'br', // 右下角
];

// 定义组件的 props
const VdrProps = {
  OFFSET: {
    //偏移量
    type: Number,
    default: 10,
  },
  initW: {
    // 初始宽度
    type: Number,
    default: null,
  },
  initH: {
    // 初始高度
    type: Number,
    default: null,
  },
  w: {
    // 当前宽度
    type: Number,
    default: 0,
  },
  h: {
    // 当前高度
    type: Number,
    default: 0,
  },
  x: {
    // 当前 X 坐标
    type: Number,
    default: 0,
  },
  y: {
    // 当前 Y 坐标
    type: Number,
    default: 0,
  },
  draggable: {
    // 是否可拖拽
    type: Boolean,
    default: true,
  },
  resizable: {
    // 是否可调整大小
    type: Boolean,
    default: true,
  },
  disabledX: {
    // 禁用 X 方向拖拽
    type: Boolean,
    default: false,
  },
  disabledY: {
    // 禁用 Y 方向拖拽
    type: Boolean,
    default: false,
  },
  disabledW: {
    // 禁用宽度调整
    type: Boolean,
    default: false,
  },
  disabledH: {
    // 禁用高度调整
    type: Boolean,
    default: false,
  },
  minW: {
    // 最小宽度
    type: Number,
    default: 20,
  },
  minH: {
    // 最小高度
    type: Number,
    default: 20,
  },
  active: {
    // 是否激活状态
    type: Boolean,
    default: false,
  },
  parent: {
    // 是否使用父容器限制
    type: Boolean,
    default: false,
  },
  handles: {
    // 可用的调整大小把手
    type: Array,
    default: ALL_HANDLES,
    validator: (handles: ResizingHandle[]) => {
      // 验证提供的把手是否有效
      return filterHandles(handles).length === handles.length;
    },
  },
  classNameDraggable: {
    // 拖拽状态的类名
    type: String,
    default: 'draggable',
  },
  classNameResizable: {
    // 调整大小状态的类名
    type: String,
    default: 'resizable',
  },
  classNameDragging: {
    // 正在拖拽时的类名
    type: String,
    default: 'dragging',
  },
  classNameResizing: {
    // 正在调整大小时的类名
    type: String,
    default: 'resizing',
  },
  classNameActive: {
    // 激活状态的类名
    type: String,
    default: 'active',
  },
  classNameHandle: {
    // 调整大小把手的类名
    type: String,
    default: 'handle',
  },
  lockAspectRatio: {
    // 是否锁定宽高比
    type: Boolean,
    default: false,
  },
};

// 定义组件可以发出的事件
const emits = [
  'activated', // 激活时触发
  'deactivated', // 取消激活时触发
  'drag-start', // 拖拽开始时触发
  'resize-start', // 调整大小开始时触发
  'dragging', // 拖拽过程中触发
  'resizing', // 调整大小过程中触发
  'drag-end', // 拖拽结束时触发
  'resize-end', // 调整大小结束时触发
  'update:w', // 宽度更新时触发
  'update:h', // 高度更新时触发
  'update:x', // X 坐标更新时触发
  'update:y', // Y 坐标更新时触发
  'update:active', // 激活状态更新时触发
];

// 定义 Vue3DraggableResizable 组件
const VueDraggableResizable = defineComponent({
  name: 'Vue3DraggableResizable', // 组件名称
  props: VdrProps, // 使用上面定义的 props
  emits: emits, // 使用上面定义的事件
  setup(props, { emit }) {
    // 初始化组件状态
    const containerProps = initState(props, emit);
    const provideIdentity = inject('identity'); // 注入身份标识
    let containerProvider: ContainerProvider | null = null;

    // 如果当前组件是容器的一部分，则注入相关方法和状态
    if (provideIdentity === IDENTITY) {
      containerProvider = {
        updatePosition: inject<UpdatePosition>('updatePosition')!, // 更新位置的方法
        getPositionStore: inject<GetPositionStore>('getPositionStore')!, // 获取位置存储的方法
        disabled: inject<Ref<boolean>>('disabled')!, // 是否禁用
        adsorbParent: inject<Ref<boolean>>('adsorbParent')!, // 是否吸附父容器
        adsorbCols: inject<number[]>('adsorbCols')!, // 吸附列
        adsorbRows: inject<number[]>('adsorbRows')!, // 吸附行
        setMatchedLine: inject<SetMatchedLine>('setMatchedLine')!, // 设置匹配线的方法
      };
    }
    // const OFFSET = ref<number>(10); // 假设 OFFSET 是一个响应式变量
    // 定义容器的引用
    const containerRef = ref<HTMLElement>();
    // 初始化父容器相关逻辑
    const parentSize = initParent(containerRef);
    // 初始化尺寸限制和相关方法
    const limitProps = initLimitSizeAndMethods(
      props,
      parentSize,
      containerProps
    );
    console.log('containerProvider', containerProvider);

    // 初始化可拖拽容器的逻辑
    initDraggableContainer(
      containerRef,
      containerProps,
      limitProps,
      toRef(props, 'draggable'),
      emit,
      containerProvider,
      parentSize,
      props.OFFSET
    );
    // 初始化调整大小把手的逻辑
    const resizeHandle = initResizeHandle(
      containerProps,
      limitProps,
      parentSize,
      props,
      emit
    );
    // 监听 props 变化并更新状态
    watchProps(props, limitProps);

    // 返回组件的状态和方法
    return {
      containerRef,
      containerProvider,
      ...containerProps,
      ...parentSize,
      ...limitProps,
      ...resizeHandle,
    };
  },
  computed: {
    // 计算样式
    style(): { [propName: string]: string } {
      return {
        width: this.width + 'px', // 宽度
        height: this.height + 'px', // 高度
        top: this.top + 'px', // Y 坐标
        left: this.left + 'px', // X 坐标
      };
    },
    // 计算类名
    klass(): { [propName: string]: string | boolean } {
      return {
        [this.classNameActive]: this.enable, // 激活状态
        [this.classNameDragging]: this.dragging, // 拖拽状态
        [this.classNameResizing]: this.resizing, // 调整大小状态
        [this.classNameDraggable]: this.draggable, // 可拖拽状态
        [this.classNameResizable]: this.resizable, // 可调整大小状态
      };
    },
  },
  mounted() {
    // 组件挂载时的逻辑
    if (!this.containerRef) return; // 如果容器未定义，则直接返回
    this.containerRef.ondragstart = () => false; // 禁用默认的拖拽行为

    // 获取容器的初始宽高
    const { width, height } = getElSize(this.containerRef);
    this.setWidth(this.initW === null ? this.w || width : this.initW); // 设置初始宽度
    this.setHeight(this.initH === null ? this.h || height : this.initH); // 设置初始高度

    // 如果是容器的一部分，则更新位置
    if (this.containerProvider) {
      this.containerProvider.updatePosition(this.id, {
        x: this.left,
        y: this.top,
        w: this.width,
        h: this.height,
      });
    }
  },
  render() {
    // 渲染组件
    return h(
      'div',
      {
        ref: 'containerRef', // 绑定容器引用
        class: ['vdr-container', this.klass], // 动态类名
        style: this.style, // 动态样式
      },
      [
        this.$slots.default && this.$slots.default(), // 默认插槽内容
        ...this.handlesFiltered.map((item: any) =>
          h('div', {
            // 渲染调整大小的把手
            class: [
              'vdr-handle',
              'vdr-handle-' + item,
              this.classNameHandle,
              `${this.classNameHandle}-${item}`,
            ],
            style: { display: this.enable ? 'block' : 'none' }, // 根据状态显示或隐藏把手
            onMousedown: (e: MouseEvent) =>
              this.resizeHandleDown(e, <ResizingHandle>item), // 鼠标按下事件
            onTouchstart: (e: TouchEvent) =>
              this.resizeHandleDown(e, <ResizingHandle>item), // 触摸开始事件
          })
        ),
      ]
    );
  },
});

// 导出组件
export default VueDraggableResizable;
