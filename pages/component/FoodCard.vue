<template>
  <view class="food-card" @click="handleClickCard">
    <image :src="item.image" mode="widthFix" class="food-image" />
    <view class="card-content">
      <text class="title">{{ item.title }}</text>
      <view class="user-info">
        <view class="user-left">
          <image :src="item.avatar" class="avatar" mode="aspectFill" />
          <text class="username">{{ item.username }}</text>
        </view>
        <view class="rating">
          <text class="rating-text">{{ item.rating.toFixed(1) }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({
      id: "",
      title: "",
      image: "",
      avatar: "",
      username: "",
      rating: 0,
    }),
  },
});
const handleClickCard = () => {
  uni.navigateTo({
    url: `/pages/details/index?id=${props.item.id}`,
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
</style>
