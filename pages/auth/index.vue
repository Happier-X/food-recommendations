<template>
  <view class="page">
    <view class="container">
      <view class="logo-container">
        <svg
          class="logo"
          viewBox="0 0 240 240"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="120" cy="120" r="110" fill="#fff5e6" />
          <circle
            cx="120"
            cy="120"
            r="70"
            fill="none"
            stroke="#ff9933"
            stroke-width="12"
          />
          <path
            d="M90 80v80M80 80v30M100 80v30"
            stroke="#ff9933"
            stroke-width="8"
            stroke-linecap="round"
          />
          <path
            d="M140 80v80"
            stroke="#ff9933"
            stroke-width="8"
            stroke-linecap="round"
          />
          <circle cx="140" cy="80" r="12" fill="#ff9933" />
        </svg>
        <text class="title">美食推荐</text>
        <text class="subtitle">发现城市美味，分享舌尖故事</text>
      </view>

      <view class="card">
        <wd-tabs v-model="activeTab" class="auth-tabs">
          <wd-tab title="登录">
            <view class="form-container">
              <view class="role-section">
                <text class="role-title">请选择登录身份</text>
                <wd-radio-group v-model="loginForm.role" class="role-group">
                  <view class="role-options">
                    <view
                      class="role-item"
                      :class="{ active: loginForm.role === 'personal' }"
                    >
                      <wd-radio value="personal">
                        <view class="role-content">
                          <text class="role-name">个人</text>
                        </view>
                      </wd-radio>
                    </view>
                    <view
                      class="role-item"
                      :class="{ active: loginForm.role === 'business' }"
                    >
                      <wd-radio value="business">
                        <view class="role-content">
                          <text class="role-name">商家</text>
                        </view>
                      </wd-radio>
                    </view>
                  </view>
                </wd-radio-group>
              </view>

              <wd-input
                v-model="loginForm.username"
                label="用户名"
                placeholder="请输入用户名"
              />
              <wd-input
                v-model="loginForm.password"
                label="密码"
                placeholder="请输入密码"
                show-password
              />
              <view class="button-wrapper">
                <wd-button block type="primary" @click="handleLogin">
                  登录
                </wd-button>
              </view>
            </view>
          </wd-tab>

          <wd-tab title="注册">
            <view class="form-container">
              <view class="role-section">
                <text class="role-title">请选择用户类型</text>
                <wd-radio-group v-model="registerForm.role" class="role-group">
                  <view class="role-options">
                    <view
                      class="role-item"
                      :class="{ active: registerForm.role === 'personal' }"
                    >
                      <wd-radio value="personal">
                        <view class="role-content">
                          <text class="role-name">个人</text>
                        </view>
                      </wd-radio>
                    </view>
                    <view
                      class="role-item"
                      :class="{ active: registerForm.role === 'business' }"
                    >
                      <wd-radio value="business">
                        <view class="role-content">
                          <text class="role-name">商家</text>
                        </view>
                      </wd-radio>
                    </view>
                  </view>
                </wd-radio-group>
              </view>

              <wd-input
                v-model="registerForm.username"
                label="用户名"
                placeholder="请输入用户名"
              />
              <wd-input
                v-model="registerForm.password"
                label="密码"
                placeholder="请输入密码"
                show-password
              />
              <wd-input
                v-model="registerForm.confirmPassword"
                label="确认密码"
                placeholder="请再次输入密码"
                show-password
              />
              <view class="button-wrapper">
                <wd-button block type="primary" @click="handleRegister">
                  注册
                </wd-button>
              </view>
            </view>
          </wd-tab>
        </wd-tabs>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const activeTab = ref(0);

const loginForm = ref({
  username: "",
  password: "",
  role: "personal",
});

const registerForm = ref({
  username: "",
  password: "",
  confirmPassword: "",
  role: "personal",
});

const handleLogin = () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
    });
    return;
  }
  // TODO: 实现登录逻辑
  console.log("登录表单:", loginForm.value);
};

const handleRegister = () => {
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

  // TODO: 实现注册逻辑
  console.log("注册表单:", registerForm.value);
};
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #fff5e6, #ffffff);
  padding: 40rpx;
}

.container {
  max-width: 1200rpx;
  margin: 0 auto;
  padding-top: 80rpx;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80rpx;

  .logo {
    width: 200rpx;
    height: 200rpx;
    animation: float 3s ease-in-out infinite;
    filter: drop-shadow(0 20rpx 30rpx rgba(255, 153, 51, 0.2));
    transform-origin: center;

    &:hover {
      animation-play-state: paused;
      transform: scale(1.05);
      transition: transform 0.3s ease;
    }
  }

  .title {
    margin-top: 40rpx;
    font-size: 56rpx;
    color: #333;
    font-weight: 600;
  }

  .subtitle {
    margin-top: 16rpx;
    font-size: 28rpx;
    color: #666;
  }
}

.card {
  background: #ffffff;
  border-radius: 32rpx;
  box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.05);
  padding: 40rpx;
}

.form-container {
  padding: 40rpx 0 20rpx;
  min-height: 720rpx;
  display: flex;
  flex-direction: column;
}

.role-section {
  margin-bottom: 50rpx;

  .role-title {
    font-size: 30rpx;
    color: #333;
    margin-bottom: 24rpx;
    display: block;
    font-weight: 500;
  }
}

.role-options {
  display: flex;
  gap: 24rpx;
}

.role-item {
  flex: 1;
  background-color: #fff9f0;
  border-radius: 24rpx;
  padding: 24rpx;
  transition: all 0.3s ease;
  border: 4rpx solid transparent;
  cursor: pointer;

  &:hover {
    transform: translateY(-2rpx);
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
  }

  &.active {
    background-color: #fff0db;
    border-color: #ff9933;
  }

  .role-name {
    font-size: 30rpx;
    font-weight: 500;
    color: #333;
    text-align: center;
  }
}

.button-wrapper {
  margin-top: auto;
  padding-top: 60rpx;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -100rpx;
    left: 0;
    right: 0;
    height: 100rpx;
    background: linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0));
    pointer-events: none;
  }
}

:deep(.wd-tabs__nav) {
  background: transparent;
  margin-bottom: 20rpx;
}

:deep(.wd-tabs__nav-item) {
  font-size: 32rpx;
  font-weight: 500;
}

:deep(.wd-input) {
  margin-bottom: 40rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

:deep(.wd-button) {
  height: 88rpx;
  font-size: 32rpx;
  border-radius: 16rpx;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20rpx);
  }
}

/* 适配暗色模式 */
@media (prefers-color-scheme: dark) {
  .page {
    background: linear-gradient(to bottom, #1a1a1a, #000000);
  }

  .card {
    background: #1a1a1a;
    box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.2);
  }

  .logo-container {
    .title {
      color: #ffffff;
    }

    .subtitle {
      color: #999;
    }
  }

  .role-item {
    background-color: #2a2a2a;

    &.active {
      background-color: #4d2e00;
      border-color: #ff9933;
    }

    .role-name {
      color: #ffffff;
    }
  }

  .button-wrapper {
    &::before {
      background: linear-gradient(to top, #1a1a1a, rgba(26, 26, 26, 0));
    }
  }
}
</style>
