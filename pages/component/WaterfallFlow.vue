<template>
  <view class="waterfall-container">
    <view
      class="waterfall-column"
      v-for="(column, columnIndex) in columns"
      :key="columnIndex"
    >
      <view
        class="waterfall-item"
        v-for="(item, index) in column"
        :key="index"
        @click="handleItemClick(item)"
      >
        <slot name="item" :item="item">
          <!-- 默认内容插槽 -->
          <image
            :src="item.image"
            mode="widthFix"
            @load="onImageLoad(columnIndex, index)"
          />
          <view class="item-content">
            <text class="title">{{ item.title }}</text>
            <text class="desc">{{ item.description }}</text>
          </view>
        </slot>
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
  // 列数
  columnCount: {
    type: Number,
    default: 2,
  },
  // 列间距
  columnGap: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits(["itemClick"]);

// 分列数据
const columns = ref(
  Array(props.columnCount)
    .fill()
    .map(() => [])
);

// 监听数据变化重新布局
watch(
  () => props.list,
  () => {
    initLayout();
  },
  { deep: true }
);

// 初始化布局
const initLayout = () => {
  // 清空原有数据
  columns.value = Array(props.columnCount)
    .fill()
    .map(() => []);

  // 按列数均匀分配数据
  props.list.forEach((item, index) => {
    const columnIndex = index % props.columnCount;
    columns.value[columnIndex].push(item);
  });
};

// 图片加载完成
const onImageLoad = (columnIndex, index) => {
  // 可以在这里处理图片加载完成后的逻辑
};

// 点击事件
const handleItemClick = (item) => {
  emit("itemClick", item);
};

onMounted(() => {
  initLayout();
});
</script>

<style lang="scss" scoped>
.waterfall-container {
  display: flex;
  padding: 10rpx;
  box-sizing: border-box;
  gap: v-bind("`${columnGap}rpx`");

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

      image {
        width: 100%;
        height: auto;
        vertical-align: middle;
        background-color: #f5f5f5;
      }

      .item-content {
        padding: 16rpx;

        .title {
          font-size: 28rpx;
          font-weight: 500;
          color: #333;
          margin-bottom: 8rpx;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .desc {
          font-size: 24rpx;
          color: #666;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
