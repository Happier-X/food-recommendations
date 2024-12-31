<template>
  <view class="container">
    <view class="logo-container">
      <svg
        class="logo"
        viewBox="0 0 240 240"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="120" cy="120" r="110" fill="#f0f9ff" />
        <circle cx="120" cy="100" r="40" fill="#0084ff" />
        <path
          d="M120 150c-33.137 0-60 20.373-60 45.5 0 1.657 1.343 3 3 3h114c1.657 0 3-1.343 3-3 0-25.127-26.863-45.5-60-45.5z"
          fill="#0084ff"
        />
      </svg>
      <text class="title">欢迎使用</text>
    </view>

    <wd-tabs v-model="activeTab">
      <wd-tab title="登录">
        <view class="form-container">
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
.container {
  padding: 20px;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px 0;
}

.logo {
  width: 120px;
  height: 120px;
  animation: float 3s ease-in-out infinite;
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

.title {
  margin-top: 15px;
  font-size: 24px;
  color: #333;
  font-weight: 500;
}

.form-container {
  padding: 20px 0;
}

.button-wrapper {
  margin-top: 30px;
}

:deep(.wd-radio-group) {
  margin: 20px 0;
}

:deep(.wd-radio) {
  margin-right: 0;
  width: 100%;
  padding: 0;
}

:deep(.wd-radio__label) {
  flex: 1;
  margin: 0;
  padding: 0;
  justify-content: center;
  text-align: center;
  width: 100%;
}

:deep(.wd-radio__shape) {
  display: none !important;
  width: 0;
  margin: 0;
}

:deep(.wd-input) {
  margin-bottom: 20px;
}

.role-section {
  margin-bottom: 30px;
}

.role-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
  display: block;
}

.role-options {
  display: flex;
  gap: 15px;
}

.role-item {
  flex: 1;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 12px 15px;
  transition: all 0.3s;
  border: 2px solid transparent;
  cursor: pointer;
}

.role-item.active {
  background-color: #f0f9ff;
  border-color: #0084ff;
}

.role-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.role-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  text-align: center;
  width: 100%;
}
</style>
