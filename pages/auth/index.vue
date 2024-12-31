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

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #fff5e6, #ffffff);
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding-top: 40px;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.logo {
  width: 100px;
  height: 100px;
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 10px 15px rgba(255, 153, 51, 0.2));
  transform-origin: center;
}

.logo:hover {
  animation-play-state: paused;
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.title {
  margin-top: 20px;
  font-size: 28px;
  color: #333;
  font-weight: 600;
}

.subtitle {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

.form-container {
  padding: 20px 0 10px;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 90px;
}

.role-section {
  margin-bottom: 25px;
}

.role-title {
  font-size: 15px;
  color: #333;
  margin-bottom: 12px;
  display: block;
  font-weight: 500;
}

.role-options {
  display: flex;
  gap: 12px;
}

.role-item {
  flex: 1;
  background-color: #fff9f0;
  border-radius: 12px;
  padding: 12px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;
}

.role-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.role-item.active {
  background-color: #fff0db;
  border-color: #ff9933;
}

.role-name {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  text-align: center;
}

:deep(.wd-tabs__nav) {
  background: transparent;
  margin-bottom: 10px;
}

:deep(.wd-tabs__nav-item) {
  font-size: 16px;
  font-weight: 500;
}

:deep(.wd-input) {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
}

:deep(.wd-button) {
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
}

.button-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px 0 10px;
  background: linear-gradient(to top, #ffffff 50%, rgba(255, 255, 255, 0));
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 适配暗色模式 */
@media (prefers-color-scheme: dark) {
  .page {
    background: linear-gradient(to bottom, #1a1a1a, #000000);
  }

  .card {
    background: #1a1a1a;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .title {
    color: #ffffff;
  }

  .subtitle {
    color: #999;
  }

  .role-item {
    background-color: #2a2a2a;
  }

  .role-item.active {
    background-color: #4d2e00;
    border-color: #ff9933;
  }

  .role-name {
    color: #ffffff;
  }

  .button-wrapper {
    background: linear-gradient(to top, #1a1a1a 50%, rgba(26, 26, 26, 0));
  }
}
</style>
