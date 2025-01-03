<template>
  <view class="user-container">
    <!-- 顶部导航栏 -->
    <wd-navbar fixed placeholder title="我的" safeAreaInsetTop></wd-navbar>

    <!-- 用户信息区域 -->
    <view class="user-info">
      <view class="avatar-box">
        <image class="avatar" src="/static/avatar.jpg" mode="aspectFill" />
        <view class="edit-avatar">
          <wd-icon name="camera-fill" size="16" color="#fff" />
        </view>
      </view>
      <view class="info-text">
        <text class="username">admin</text>
        <view class="stats-row">
          <view class="stat-item">
            <text class="num">56</text>
            <text class="label">收藏</text>
          </view>
          <view class="stat-item">
            <text class="num">12</text>
            <text class="label">推荐</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 服务功能区域 -->
    <view class="service-section">
      <view class="section-title">服务功能</view>
      <view class="grid-container">
        <!-- 编辑资料 -->
        <view class="grid-item" @click="handleService('edit')">
          <view class="icon-box">
            <wd-icon name="edit" size="24" />
          </view>
          <text class="label">编辑资料</text>
        </view>

        <!-- 商家食品 -->
        <view class="grid-item" @click="handleService('food')">
          <view class="icon-box">
            <wd-icon name="shop" size="24" />
          </view>
          <text class="label">商家食品</text>
        </view>

        <!-- 我的推荐 -->
        <view class="grid-item" @click="handleService('recommend')">
          <view class="icon-box">
            <wd-icon name="star" size="24" />
          </view>
          <text class="label">我的推荐</text>
        </view>

        <!-- 收藏 -->
        <view class="grid-item" @click="handleService('favorite')">
          <view class="icon-box">
            <wd-icon name="collect" size="24" />
          </view>
          <text class="label">收藏</text>
        </view>

        <!-- 联系客服 -->
        <view class="grid-item" @click="handleService('contact')">
          <view class="icon-box">
            <wd-icon name="service" size="24" />
          </view>
          <text class="label">联系客服</text>
        </view>

        <!-- 关于我们 -->
        <view class="grid-item" @click="handleService('about')">
          <view class="icon-box">
            <wd-icon name="info" size="24" />
          </view>
          <text class="label">关于我们</text>
        </view>

        <!-- 退出 -->
        <view class="grid-item" @click="handleService('logout')">
          <view class="icon-box">
            <wd-icon name="exit" size="24" />
          </view>
          <text class="label">退出</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

// 处理服务点击
const handleService = (type) => {
  switch (type) {
    case "edit":
      uni.showToast({ title: "编辑资料", icon: "none" });
      break;
    case "food":
      uni.showToast({ title: "商家食品", icon: "none" });
      break;
    case "recommend":
      uni.showToast({ title: "我的推荐", icon: "none" });
      break;
    case "favorite":
      uni.showToast({ title: "收藏", icon: "none" });
      break;
    case "contact":
      uni.showToast({ title: "联系客服", icon: "none" });
      break;
    case "about":
      uni.showToast({ title: "关于我们", icon: "none" });
      break;
    case "logout":
      uni.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            uni.showToast({
              title: "退出成功",
              icon: "success",
              success: () => {
                // TODO: 处理退出逻辑
              },
            });
          }
        },
      });
      break;
  }
};
</script>

<style lang="scss" scoped>
.user-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.user-info {
  position: relative;
  padding: 80rpx 40rpx;
  background: linear-gradient(135deg, #ffc600 0%, #ffc600 100%);
  display: flex;
  align-items: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -60%;
    right: -20%;
    width: 400rpx;
    height: 400rpx;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 70%
    );
    border-radius: 50%;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 300rpx;
    height: 300rpx;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 70%
    );
    border-radius: 50%;
  }

  .avatar-box {
    position: relative;
    width: 160rpx;
    height: 160rpx;
    border-radius: 80rpx;
    overflow: hidden;
    border: 6rpx solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
    flex-shrink: 0;
    transition: transform 0.3s ease;

    &:active {
      transform: scale(0.95);
    }

    .avatar {
      width: 100%;
      height: 100%;
    }

    .edit-avatar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 44rpx;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.3)
      );
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(4px);
    }
  }

  .info-text {
    flex: 1;
    margin-left: 60rpx;
    padding-right: 20rpx;
    color: #fff;
    position: relative;
    z-index: 1;

    .username {
      display: block;
      font-size: 44rpx;
      font-weight: 600;
      margin-bottom: 24rpx;
      text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.15);
    }

    .stats-row {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-left: -4rpx;

      .stat-item {
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-right: 48rpx;
        position: relative;

        &:last-child {
          margin-right: 0;
        }

        &:not(:last-child)::after {
          content: "";
          position: absolute;
          right: -24rpx;
          top: 50%;
          transform: translateY(-50%);
          width: 1rpx;
          height: 24rpx;
          background: rgba(255, 255, 255, 0.3);
        }

        .num {
          font-size: 38rpx;
          font-weight: 600;
          margin-right: 8rpx;
          font-family: DIN;
          background: linear-gradient(
            to bottom,
            #fff,
            rgba(255, 255, 255, 0.9)
          );
          -webkit-background-clip: text;
          color: transparent;
        }

        .label {
          font-size: 26rpx;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 500;
        }
      }
    }
  }
}

.service-section {
  margin: 24rpx;
  padding: 24rpx;
  background-color: #fff;
  border-radius: 12rpx;

  .section-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 24rpx;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32rpx 16rpx;
  }

  .grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon-box {
      width: 80rpx;
      height: 80rpx;
      background-color: #fff5e6;
      border-radius: 40rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12rpx;

      :deep(.wd-icon) {
        color: #ffc600;
      }
    }

    .label {
      font-size: 24rpx;
      color: #666;
    }
  }
}
</style>
