<template>
  <view class="waterfall-container">
    <view
      class="waterfall-column"
      v-for="(column, columnIndex) in columns"
      :key="columnIndex"
    >
      <view class="waterfall-item" v-for="(item, index) in column" :key="index">
        <slot name="item" :item="item"></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  // 数据列表
  list: {
    type: Array,
    default: () => [],
  },
  // 瀑布流列数
  columnCount: {
    type: Number,
    default: 2,
  },
  // 列间距（单位：rpx）
  columnGap: {
    type: Number,
    default: 10,
  },
});

// 分列数据：按列数初始化空数组
const columns = ref(
  Array(props.columnCount)
    .fill()
    .map(() => [])
);

// 监听数据变化时重新布局
watch(
  () => props.list,
  () => {
    initLayout();
  },
  { deep: true }
);

// 初始化瀑布流布局
const initLayout = () => {
  // 重置列数据
  columns.value = Array(props.columnCount)
    .fill()
    .map(() => []);

  // 按列数均匀分配数据
  props.list.forEach((item, index) => {
    const columnIndex = index % props.columnCount;
    columns.value[columnIndex].push(item);
  });
};

// 组件挂载时初始化布局
onMounted(() => {
  initLayout();
});
</script>

<style lang="scss" scoped>
.waterfall-container {
  display: flex;
  padding: 10rpx;
  box-sizing: border-box;
  gap: v-bind("`${props.columnGap}rpx`");

  .waterfall-column {
    flex: 1;

    .waterfall-item {
      margin-bottom: 20rpx;
      border-radius: 12rpx;
      overflow: hidden;
      background: #fff;
      box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2rpx);
        box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.15);
      }
    }
  }
}
</style>
