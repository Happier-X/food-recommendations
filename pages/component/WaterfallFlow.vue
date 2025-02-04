<template>
  <view class="waterfall-container">
    <view
      class="waterfall-column"
      v-for="(column, columnIndex) in columns"
      :key="columnIndex"
    >
      <view class="waterfall-item" v-for="(item, index) in column" :key="index">
        <view class="food-card" @click="handleClickCard(item)">
          <image
            :src="`${BASE_URL}${item.imageUrl[0]}`"
            mode="widthFix"
            class="food-image"
          />
          <view class="card-content">
            <text class="title">{{ item.name }}</text>
            <view class="user-info">
              <view class="user-left">
                <image
                  :src="`${BASE_URL}${item.user.avatar}`"
                  class="avatar"
                  mode="aspectFill"
                />
                <text class="username">{{ item.user.name }}</text>
              </view>
              <view class="rating">
                <text class="rating-text">{{
                  item.averageRating.toFixed(1)
                }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { BASE_URL } from "@/utils/request.js";

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
const handleClickCard = (item) => {
  uni.navigateTo({
    url: `/pages/details/index?id=${item.id}`,
  });
};
</script>

<style lang="scss" scoped>
// 文本省略混入
@mixin text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
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

      .food-card {
        .food-image {
          width: 100%;
          height: auto;
          background-color: #f5f5f5;
        }

        .card-content {
          padding: 16rpx;

          .title {
            font-size: 28rpx;
            color: #333;
            line-height: 1.4;
            margin-bottom: 16rpx;
            font-weight: 500;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }

          .user-info {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .user-left {
              display: flex;
              align-items: center;
              flex: 1;
              min-width: 0; // 防止子元素溢出

              .avatar {
                width: 40rpx;
                height: 40rpx;
                border-radius: 50%;
                margin-right: 12rpx;
              }

              .username {
                font-size: 24rpx;
                color: #666;
                @include text-ellipsis;
              }
            }

            .rating {
              display: flex;
              align-items: center;

              .rating-text {
                margin-left: 8rpx;
                font-size: 24rpx;
                color: #ffc300;
                font-weight: 500;
              }
            }
          }
        }
      }
    }
  }
}
</style>
