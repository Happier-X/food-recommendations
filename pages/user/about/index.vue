<template>
  <view class="about-container">
    <!-- 顶部导航栏 -->
    <wd-navbar
      fixed
      placeholder
      title="关于我们"
      left-arrow
      @click-left="handleBack"
      safeAreaInsetTop
    ></wd-navbar>

    <!-- 内容区域 -->
    <view class="content">
      <!-- Logo -->
      <view class="logo-section">
        <image src="/static/logo.png" mode="aspectFit" class="logo" />
        <text class="app-name">美食推荐</text>
        <text class="version">Version 1.0.0</text>
      </view>

      <!-- 介绍文本 -->
      <view class="intro-section">
        <text class="intro-text">
          美食推荐是一款专注于分享美食体验的社交平台。在这里，你可以：
        </text>
        <view class="feature-list">
          <view class="feature-item">
            <view class="icon-box">
              <wd-icon name="thumb-up" size="20" />
            </view>
            <text>发现身边的美食推荐</text>
          </view>
          <view class="feature-item">
            <view class="icon-box">
              <wd-icon name="share" size="20" />
            </view>
            <text>分享你的美食体验</text>
          </view>
          <view class="feature-item">
            <view class="icon-box">
              <wd-icon name="star" size="20" />
            </view>
            <text>收藏喜欢的美食</text>
          </view>
          <view class="feature-item">
            <view class="icon-box">
              <wd-icon name="comment" size="20" />
            </view>
            <text>与其他美食爱好者交流</text>
          </view>
        </view>
      </view>

      <!-- 底部版权信息 -->
      <view class="footer">
        <text class="copyright">© 2024 美食推荐 版权所有</text>
      </view>
    </view>
  </view>
</template>

<script setup>
// 返回上一页
const handleBack = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.about-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8f8f8, #fff);
}

.content {
  padding: 48rpx 32rpx;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80rpx;
  animation: scaleIn 0.6s ease-out;

  .logo {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 32rpx;
    border-radius: 40rpx;
    box-shadow: 0 8rpx 32rpx rgba(255, 198, 0, 0.2);
    transition: transform 0.3s ease;

    &:active {
      transform: scale(0.95);
    }
  }

  .app-name {
    font-size: 48rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 16rpx;
    background: linear-gradient(120deg, #333, #666);
    -webkit-background-clip: text;
    color: transparent;
  }

  .version {
    font-size: 24rpx;
    color: #999;
    padding: 4rpx 20rpx;
    background: rgba(153, 153, 153, 0.1);
    border-radius: 20rpx;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.intro-section {
  background: #fff;
  border-radius: 32rpx;
  padding: 48rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.05);
  animation: slideUp 0.8s ease-out 0.2s both;

  .intro-text {
    font-size: 30rpx;
    color: #666;
    line-height: 1.8;
    margin-bottom: 48rpx;
    text-align: justify;
    letter-spacing: 0.5rpx;
  }

  .feature-list {
    display: flex;
    flex-direction: column;
    gap: 36rpx;

    .feature-item {
      display: flex;
      align-items: center;
      gap: 24rpx;
      transition: transform 0.2s ease;

      &:active {
        transform: translateX(8rpx);
      }

      .icon-box {
        width: 80rpx;
        height: 80rpx;
        background: linear-gradient(135deg, #fff5e6, #fff9f0);
        border-radius: 24rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4rpx 16rpx rgba(255, 198, 0, 0.15);

        :deep(.wd-icon) {
          color: #ffc600;
        }
      }

      text {
        font-size: 30rpx;
        color: #333;
        font-weight: 500;
      }
    }
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.footer {
  margin-top: 80rpx;
  text-align: center;
  animation: fadeIn 0.8s ease-out 0.4s both;

  .copyright {
    font-size: 24rpx;
    color: #999;
    opacity: 0.8;
  }
}
</style>
