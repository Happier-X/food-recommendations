<template>
  <view class="details-container">
    <!-- 顶部导航栏 -->
    <wd-navbar
      fixed
      safeAreaInsetTop
      placeholder
      title="美食详情"
      left-arrow
      @click-left="handleBack"
    ></wd-navbar>

    <!-- 图片轮播 -->
    <view class="swiper-container">
      <wd-swiper :list="foodInfo.images"></wd-swiper>
    </view>

    <!-- 内容区域 -->
    <view class="content-wrapper">
      <!-- 基本信息 -->
      <view class="info-section">
        <view class="title-row">
          <text class="title">{{ foodInfo.title }}</text>
          <view class="right-actions">
            <view class="rating">
              <text class="rating-text">{{ foodInfo.rating.toFixed(1) }}</text>
            </view>
            <view class="collect-btn" @click.stop="handleCollect">
              <wd-icon
                :name="isCollected ? 'star-filled' : 'star'"
                size="20"
                :color="isCollected ? '#ffc600' : '#999'"
              />
            </view>
          </view>
        </view>

        <view class="divider"></view>

        <!-- 推荐理由 -->
        <view class="reason-content">
          <text class="reason-text">{{ foodInfo.description }}</text>
        </view>
      </view>

      <!-- 商家信息 -->
      <view class="merchant-section">
        <view class="info-item">
          <wd-icon name="shop" size="16" />
          <text class="label">商家名称</text>
          <text class="value">{{ foodInfo.shopName }}</text>
        </view>

        <view class="info-item" @click="handleOpenLocation">
          <wd-icon name="location" size="16" />
          <text class="label">店铺位置</text>
          <text class="value">{{ foodInfo.location }}</text>
          <wd-icon name="arrow-right" size="16" class="arrow-icon" />
        </view>

        <view class="info-item">
          <wd-icon name="attach" size="16" />
          <text class="label">食物类型</text>
          <text class="value">{{ foodInfo.foodType }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

// 返回上一页
const handleBack = () => {
  uni.navigateBack();
};

// 处理函数
const handleOpenLocation = () => {
  // 这里需要真实的经纬度数据
  uni.openLocation({
    latitude: 23.13171, // 天河区体育西路的大致纬度
    longitude: 113.32452, // 天河区体育西路的大致经度
    name: foodInfo.value.shopName,
    address: foodInfo.value.location,
    success: () => {
      console.log("打开地图成功");
    },
    fail: (err) => {
      uni.showToast({
        title: "打开地图失败",
        icon: "none",
      });
      console.error("打开地图失败:", err);
    },
  });
};

// 模拟数据
const foodInfo = ref({
  title: "香辣小龙虾",
  shopName: "蒜香小龙虾",
  location: "广州市天河区体育西路100号",
  latitude: 23.13171,
  longitude: 113.32452,
  rating: 4.8,
  foodType: "小龙虾",
  description:
    "这家小龙虾的蒜香味道非常浓郁，虾肉鲜嫩饱满，配上秘制的酱料，让人回味无穷。特别是他们家的十三香小龙虾，香味四溢，连壳都想咬上一口！建议点3-4斤，配上一份茶位，和朋友一起分享绝对是夏夜最佳的选择。",
  images: [
    "https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg",
    "https://registry.npmmirror.com/wot-design-uni-assets/*/files/capybara.jpg",
    "https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg",
    "https://registry.npmmirror.com/wot-design-uni-assets/*/files/moon.jpg",
    "https://registry.npmmirror.com/wot-design-uni-assets/*/files/meng.jpg",
  ],
  recommender: {
    avatar:
      "https://registry.npmmirror.com/wot-design-uni-assets/*/files/avatar.jpg",
    username: "美食达人",
    recommendTime: "2024-01-20 18:30",
  },
});

const isCollected = ref(false);

const handleCollect = () => {
  isCollected.value = !isCollected.value;
  uni.showToast({
    title: isCollected.value ? "收藏成功" : "取消收藏",
    icon: "none",
  });
};
</script>

<style lang="scss" scoped>
// 添加文本溢出省略号的 mixin
@mixin text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.details-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.swiper-container {
  padding: 24rpx;
}

.content-wrapper {
  padding: 24rpx;
}

.info-section {
  background: #fff;
  border-radius: 24rpx;
  padding: 40rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

  .title-row {
    margin-bottom: 32rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .title {
      @include text-ellipsis;
      font-size: 44rpx;
      font-weight: 600;
      color: #333;
      line-height: 1.4;
      flex: 1;
      margin-right: 24rpx;
    }

    .right-actions {
      display: flex;
      align-items: center;
      gap: 24rpx;
      flex-shrink: 0;

      .rating {
        display: inline-block;
        background: rgba(255, 198, 0, 0.1);
        padding: 4rpx 20rpx;
        border-radius: 6rpx;

        .rating-text {
          font-size: 28rpx;
          color: #ffc600;
          font-weight: 600;
        }
      }

      .collect-btn {
        padding: 8rpx;

        &:active {
          opacity: 0.7;
        }
      }
    }
  }

  .reason-content {
    padding: 32rpx 0;

    .reason-text {
      font-size: 30rpx;
      color: #666;
      line-height: 1.8;
      text-align: justify;
      letter-spacing: 0.5rpx;
    }
  }

  .divider {
    height: 2rpx;
    background: #f5f5f5;
    margin: 32rpx 0;
  }
}

.merchant-section {
  background: #fff;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

  .info-item {
    display: flex;
    align-items: center;
    padding: 20rpx 0;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }

    .wd-icon {
      font-size: 36rpx;
      color: #ffc600;
      margin-right: 16rpx;
      width: 36rpx;
      height: 36rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .label {
      font-size: 28rpx;
      color: #999;
      width: 160rpx;
    }

    .value {
      @include text-ellipsis;
      font-size: 28rpx;
      color: #333;
      flex: 1;
    }

    // 添加指示箭头样式
    .arrow-icon {
      font-size: 32rpx;
      color: #999;
      margin-left: 8rpx;
    }

    // 添加点击效果
    &:active {
      opacity: 0.7;
    }
  }
}
</style>
