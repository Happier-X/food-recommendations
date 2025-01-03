<template>
  <view class="details-container">
    <!-- 顶部导航栏 -->
    <wd-navbar
      fixed
      placeholder
      title="美食详情"
      left-text="返回"
      @click-left="handleBack"
    ></wd-navbar>

    <!-- 图片轮播 -->
    <swiper
      class="swiper"
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="500"
    >
      <swiper-item v-for="(image, index) in foodInfo.images" :key="index">
        <image :src="image" mode="aspectFill" class="swiper-image" />
      </swiper-item>
    </swiper>

    <!-- 基本信息 -->
    <view class="info-section">
      <view class="title-row">
        <text class="title">{{ foodInfo.title }}</text>
        <view class="rating">
          <wd-rate :modelValue="foodInfo.rating" :size="16" disabled />
          <text class="rating-text">{{ foodInfo.rating.toFixed(1) }}</text>
        </view>
      </view>

      <view class="info-item">
        <wd-icon name="shop" size="16" />
        <text class="label">商家名称：</text>
        <text class="value">{{ foodInfo.shopName }}</text>
      </view>

      <view class="info-item">
        <wd-icon name="location" size="16" />
        <text class="label">店铺位置：</text>
        <text class="value">{{ foodInfo.location }}</text>
      </view>

      <view class="info-item">
        <wd-icon name="classify" size="16" />
        <text class="label">食物类型：</text>
        <text class="value">{{ foodInfo.foodType }}</text>
      </view>
    </view>

    <!-- 推荐理由 -->
    <view class="reason-section">
      <view class="section-title">推荐理由</view>
      <text class="reason-text">{{ foodInfo.description }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

// 返回上一页
const handleBack = () => {
  uni.navigateBack();
};

// 模拟数据
const foodInfo = ref({
  title: "香辣小龙虾",
  shopName: "蒜香小龙虾",
  location: "广州市天河区体育西路100号",
  rating: 4.8,
  foodType: "小龙虾",
  description:
    "这家小龙虾的蒜香味道非常浓郁，虾肉鲜嫩饱满，配上秘制的酱料，让人回味无穷。特别是他们家的十三香小龙虾，香味四溢，连壳都想咬上一口！建议点3-4斤，配上一份茶位，和朋友一起分享绝对是夏夜最佳的选择。",
  images: [
    "https://example.com/food1.jpg",
    "https://example.com/food2.jpg",
    "https://example.com/food3.jpg",
  ],
});
</script>

<style lang="scss" scoped>
.details-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.swiper {
  width: 100%;
  height: 500rpx;

  .swiper-image {
    width: 100%;
    height: 100%;
  }
}

.info-section {
  margin: 24rpx;
  padding: 24rpx;
  background: #fff;
  border-radius: 12rpx;

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .title {
      font-size: 36rpx;
      font-weight: 600;
      color: #333;
    }

    .rating {
      display: flex;
      align-items: center;

      .rating-text {
        margin-left: 8rpx;
        font-size: 28rpx;
        color: #ffc600;
        font-weight: 500;
      }
    }
  }

  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;

    &:last-child {
      margin-bottom: 0;
    }

    .wd-icon {
      color: #999;
      margin-right: 8rpx;
    }

    .label {
      font-size: 28rpx;
      color: #666;
      margin-right: 8rpx;
    }

    .value {
      font-size: 28rpx;
      color: #333;
      flex: 1;
    }
  }
}

.reason-section {
  margin: 24rpx;
  padding: 24rpx;
  background: #fff;
  border-radius: 12rpx;

  .section-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 16rpx;
    padding-left: 16rpx;
    border-left: 4rpx solid #ffc600;
  }

  .reason-text {
    font-size: 28rpx;
    color: #666;
    line-height: 1.6;
  }
}
</style>
