<template>
  <view class="edit-info">
    <!-- 顶部导航栏 -->
    <wd-navbar
      fixed
      placeholder
      title="编辑资料"
      left-arrow
      @click-left="handleBack"
    >
      <template #right>
        <text class="save-btn" @click="handleSave">保存</text>
      </template>
    </wd-navbar>

    <!-- 编辑区域 -->
    <view class="edit-content">
      <!-- 头像 -->
      <view class="edit-item" @click="handleChangeAvatar">
        <text class="label">头像</text>
        <view class="avatar-wrapper">
          <image :src="userInfo.avatar" class="avatar" mode="aspectFill" />
          <wd-icon name="arrow-right" size="16" class="arrow-icon" />
        </view>
      </view>

      <!-- 用户名 -->
      <view class="edit-item">
        <text class="label">用户名</text>
        <input
          type="text"
          v-model="userInfo.username"
          class="input"
          placeholder="请输入用户名"
          placeholder-class="placeholder"
        />
      </view>

      <!-- 食物类型 -->
      <view class="edit-item food-type">
        <text class="label">食物类型</text>
        <view class="food-type-list">
          <view
            v-for="item in foodTypes"
            :key="item.value"
            class="type-tag"
            :class="{ active: selectedTypes.includes(item.value) }"
            @click="toggleFoodType(item.value)"
          >
            {{ item.label }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

// 用户信息
const userInfo = ref({
  avatar: "/static/avatar.jpg",
  username: "美食达人",
});

// 食物类型列表
const foodTypes = ref([
  { value: 1, label: "饺子馄饨" },
  { value: 2, label: "火锅烤肉" },
  { value: 3, label: "包子粥面" },
  { value: 4, label: "快餐便当" },
  { value: 5, label: "汉堡薯条" },
  { value: 6, label: "意面披萨" },
  { value: 7, label: "川湘菜" },
  { value: 8, label: "地方菜系" },
  { value: 9, label: "炸鸡炸串" },
  { value: 10, label: "特色小吃" },
  { value: 11, label: "西餐" },
  { value: 12, label: "日料寿司" },
  { value: 13, label: "韩式料理" },
]);

// 已选择的食物类型
const selectedTypes = ref([1, 7, 12]);

// 返回上一页
const handleBack = () => {
  uni.navigateBack();
};

// 切换食物类型选择
const toggleFoodType = (value) => {
  const index = selectedTypes.value.indexOf(value);
  if (index > -1) {
    selectedTypes.value.splice(index, 1);
  } else {
    selectedTypes.value.push(value);
  }
};

// 更换头像
const handleChangeAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    sourceType: ["album", "camera"],
    success: (res) => {
      userInfo.value.avatar = res.tempFilePaths[0];
    },
    fail: () => {
      uni.showToast({
        title: "选择图片失败",
        icon: "none",
      });
    },
  });
};

// 保存资料
const handleSave = () => {
  if (!userInfo.value.username.trim()) {
    uni.showToast({
      title: "请输入用户名",
      icon: "none",
    });
    return;
  }

  // 这里添加保存逻辑
  uni.showToast({
    title: "保存成功",
    icon: "success",
  });
  setTimeout(() => {
    uni.navigateBack();
  }, 1500);
};
</script>

<style lang="scss" scoped>
.edit-info {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.save-btn {
  font-size: 28rpx;
  color: #ffc600;
  padding: 20rpx;

  &:active {
    opacity: 0.7;
  }
}

.edit-content {
  padding: 24rpx;
}

.edit-item {
  background: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;

  .label {
    font-size: 28rpx;
    color: #333;
    width: 140rpx;
    flex-shrink: 0;
  }

  .avatar-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .avatar {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      margin-right: 16rpx;
    }

    .arrow-icon {
      color: #999;
    }
  }

  .input {
    flex: 1;
    font-size: 28rpx;
    color: #333;
    text-align: right;
  }

  .placeholder {
    color: #999;
  }

  &.food-type {
    display: block;

    .food-type-list {
      margin-top: 24rpx;
      display: flex;
      flex-wrap: wrap;
      gap: 20rpx;

      .type-tag {
        padding: 12rpx 24rpx;
        background: #f5f5f5;
        border-radius: 32rpx;
        font-size: 26rpx;
        color: #666;
        transition: all 0.3s;

        &.active {
          background: rgba(255, 198, 0, 0.1);
          color: #ffc600;
        }

        &:active {
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
