<template>
  <view class="container">
    <view class="logo-container">
      <image 
        class="logo" 
        src="/static/images/logo.png" 
        mode="aspectFit"
      />
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
                <view class="role-item" :class="{ active: registerForm.role === 'personal' }">
                  <wd-radio value="personal">
                    <view class="role-content">
                      <text class="role-name">个人用户</text>
                      <text class="role-desc">适用于普通用户购物</text>
                    </view>
                  </wd-radio>
                </view>
                <view class="role-item" :class="{ active: registerForm.role === 'business' }">
                  <wd-radio value="business">
                    <view class="role-content">
                      <text class="role-name">商家</text>
                      <text class="role-desc">适用于商家管理店铺</text>
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
import { ref, reactive } from "vue";

const activeTab = ref(0);

const loginForm = reactive({
  username: "",
  password: "",
});

const registerForm = reactive({
  username: "",
  password: "",
  role: "personal",
});

const handleLogin = () => {
  if (!loginForm.username || !loginForm.password) {
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
    });
    return;
  }
  // TODO: 实现登录逻辑
  console.log("登录表单:", loginForm);
};

const handleRegister = () => {
  if (!registerForm.username || !registerForm.password) {
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
    });
    return;
  }
  // TODO: 实现注册逻辑
  console.log("注册表单:", registerForm);
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
  margin-right: 20px;
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
  padding: 15px;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.role-item.active {
  background-color: #f0f9ff;
  border-color: #0084ff;
}

.role-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.role-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.role-desc {
  font-size: 12px;
  color: #999;
}

:deep(.wd-radio) {
  margin-right: 0;
  width: 100%;
}

:deep(.wd-radio__label) {
  flex: 1;
}

:deep(.wd-radio__shape) {
  margin-right: 10px;
}
</style>
