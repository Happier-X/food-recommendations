<template>
  <view class="auth-container">
    <view class="auth-page">
      <!-- Logo区域 -->
      <view class="logo-box">
        <view class="logo-wrapper">
          <image src="/static/logo.png" mode="aspectFit" class="logo" />
        </view>
        <text class="subtitle">发现身边美食，分享舌尖故事</text>
      </view>

      <wd-card class="form-card">
        <wd-tabs v-model="activeTab" class="auth-tabs">
          <wd-tab title="登录">
              <view style="opacity: 0;display:flex;justify-content: center;gap:40rpx;margin:20rpx 0;">
                <wd-radio-group shape="button">
                  <wd-radio value="personal">个人用户</wd-radio>
                  <wd-radio value="business">商家用户</wd-radio>
                </wd-radio-group>
              </view>
              <view class="form-item">
                <wd-input
                  label="用户名"
                  label-width="25%"
                  width="100%"
                  v-model="loginForm.username"
                  placeholder="请输入用户名"
                  clearable
                />
              </view>
              <view class="form-item">
                <wd-input
                  label="密码"
                  label-width="25%"
                  width="100%"
                  v-model="loginForm.password"
                  placeholder="请输入密码"
                  clearable
                  show-password
                  type="password"
                />
              </view>
              <view class="form-item" style="opacity: 0;">
                <wd-input
                  label="确认密码"
                  label-width="25%"
                  width="100%"
                  v-model="registerForm.confirmPassword"
                  placeholder="请再次输入密码"
                  show-password
                  type="password"
                  clearable
                />
              </view>
          </wd-tab>

          <wd-tab title="注册">
              <view style="display:flex;justify-content: center;gap:40rpx;margin:20rpx 0;">
                <wd-radio-group v-model="registerForm.role" shape="button">
                  <wd-radio value="personal">个人用户</wd-radio>
                  <wd-radio value="business">商家用户</wd-radio>
                </wd-radio-group>
              </view>
              <view class="form-item">
                <wd-input
                  label="用户名"
                  label-width="25%"
                  width="100%"
                  v-model="registerForm.username"
                  placeholder="请输入用户名"
                  clearable
                />
              </view>
              <view class="form-item">
                <wd-input
                  label="密码"
                  label-width="25%"
                  width="100%"
                  v-model="registerForm.password"
                  placeholder="请输入密码"
                  show-password
                  clearable
                  type="password"
                />
              </view>
              <view class="form-item">
                <wd-input
                  label="确认密码"
                  label-width="25%"
                  width="100%"
                  v-model="registerForm.confirmPassword"
                  placeholder="请再次输入密码"
                  show-password
                  type="password"
                  clearable
                />
              </view>
          </wd-tab>
        </wd-tabs>

        <!-- 共用的提交按钮 -->
        <wd-button
          block
          type="primary"
          @click="handleSubmit"
          class="submit-btn"
        >
          {{ activeTab === 0 ? "登录" : "注册" }}
        </wd-button>
      </wd-card>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const activeTab = ref(0);

const loginForm = ref({
  username: "",
  password: "",
});

const registerForm = ref({
  username: "",
  password: "",
  confirmPassword: "",
  role: "personal",
});

// 统一的提交处理函数
const handleSubmit = () => {
   uni.switchTab({
      url: "/pages/home/index",
    });
  if (activeTab.value === 0) {
    // 登录逻辑
    if (!loginForm.value.username || !loginForm.value.password) {
      uni.showToast({
        title: "请填写完整信息",
        icon: "none",
      });
      return;
    }
    uni.switchTab({
      url: "/pages/home/index",
    });
    console.log("登录表单:", loginForm.value);
  } else {
    // 注册逻辑
    if (
      !registerForm.value.username ||
      !registerForm.value.password ||
      !registerForm.value.confirmPassword
    ) {
      uni.showToast({
        title: "请填写完整信息",
        icon: "none",
      });
      return;
    }

    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      uni.showToast({
        title: "两次输入的密码不一致",
        icon: "none",
      });
      return;
    }
    console.log("注册表单:", registerForm.value);
  }
};
</script>

<style lang="scss" scoped>
// Mixins
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin flex-column {
  display: flex;
  flex-direction: column;
}

.auth-container {
  height: 100vh;
  background: linear-gradient(to bottom, #fffbeb, #fff8e1);
  @include flex-center;
}

.auth-page {
  width: 100%;
  height: 100%;
  @include flex-column;
  box-sizing: border-box;
  padding: 30rpx;
}

.logo-box {
  height: 30vh;
  @include flex-column;
  justify-content: center;
  align-items: center;

  .logo-wrapper {
    width: 180rpx;
    height: 180rpx;
    background: #fff;
    border-radius: 45rpx;
    @include flex-center;
    box-shadow: 0 8rpx 16rpx rgba(255, 195, 0, 0.1);
    margin-bottom: 30rpx;

    .logo {
      width: 130rpx;
      height: 130rpx;
    }
  }

  .subtitle {
    font-size: 28rpx;
    color: #ffb000;
    font-weight: 500;
    text-shadow: 0 2rpx 4rpx rgba(255, 195, 0, 0.2);
  }
}

.form-card {
  height: 50vh;
  border-radius: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(255, 195, 0, 0.08);
  background: #fff;

  .auth-tabs {
    height: 35vh;
    width: 100%;
      .form-item {
        margin-bottom: 20rpx;
    }
  }
}
</style>
