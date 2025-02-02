<template>
  <view class="edit-info">
    <!-- 顶部导航栏 -->
    <wd-navbar fixed placeholder safeAreaInsetTop title="编辑资料" left-arrow @click-left="handleBack"></wd-navbar>

    <!-- 编辑区域 -->
    <view class="edit-content">
      <!-- 头像 -->
      <view class="edit-item">
        <text class="label">头像</text>
        <view class="avatar-wrapper">
          <wd-upload v-model="userInfo.avatar" :max-count="1" :before-read="handleBeforeRead"
            @success="handleUploadSuccess" @fail="handleUploadFail" :action="action" :header="header"
            :successStatus="201">
            <image :src="userInfo.avatar" class="avatar" mode="aspectFill" />
          </wd-upload>
        </view>
      </view>

      <!-- 用户名 -->
      <view class="edit-item">
        <wd-input v-model="userInfo.name" label="用户名" label-width="140rpx" placeholder="请输入用户名" clearable required />
      </view>

      <!-- 食物类型 -->
      <view class="edit-item food-type">
        <text class="label">饮食喜好<text class="required">*</text></text>
        <view class="food-type-list">
          <view v-for="item in foodTypes" :key="item.value" class="type-tag"
            :class="{ active: selectedTypes.includes(item.value) }" @click="toggleFoodType(item.value)">
            {{ item.label }}
          </view>
        </view>
      </view>
    </view>

    <!-- 底部保存按钮 -->
    <view class="bottom-button">
      <wd-button type="primary" block @click="handleSave">保存</wd-button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUserInfo, updateUser } from "@/api/user";

const action = "http://localhost:3000/upload";

const header = {
  Authorization: `Bearer ${uni.getStorageSync("token")}`,
};

// 用户信息
const userInfo = ref({
  id: "",
  avatar: "",
  name: "",
  preference: "",
});

onMounted(async () => {
  await getUser();
  selectedTypes.value = userInfo.value.preference.split(",");
});

// 获取用户信息
async function getUser() {
  const res = await getUserInfo();
  userInfo.value = {
    ...res,
    avatar: res.avatar ? res.avatar : ''
  };
}

// 食物类型列表
const foodTypes = ref([
  { value: "1", label: "饺子馄饨" },
  { value: "2", label: "火锅烤肉" },
  { value: "3", label: "包子粥面" },
  { value: "4", label: "快餐便当" },
  { value: "5", label: "汉堡薯条" },
  { value: "6", label: "意面披萨" },
  { value: "7", label: "川湘菜" },
  { value: "8", label: "地方菜系" },
  { value: "9", label: "炸鸡炸串" },
  { value: "10", label: "特色小吃" },
  { value: "11", label: "西餐" },
  { value: "12", label: "日料寿司" },
  { value: "13", label: "韩式料理" },
]);

// 已选择的食物类型
const selectedTypes = ref([]);

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
  userInfo.value.preference = selectedTypes.value.join(",");
};

// 上传前处理
const handleBeforeRead = (file) => {
  const isImage = file.type.includes("image");
  if (!isImage) {
    uni.showToast({
      title: "请选择图片文件",
      icon: "none",
    });
  }
  return isImage;
};

// 上传成功
const handleUploadSuccess = (res) => {
  const responseData = JSON.parse(res.fileList[0].response);
  userInfo.value.avatar = `http://localhost:3000${responseData.url}`
  console.log('111,', userInfo.value.avatar)
  uni.showToast({
    title: "上传成功",
    icon: "success",
  });
};

// 上传失败
const handleUploadFail = (err) => {
  uni.showToast({
    title: "上传失败",
    icon: "none",
  });
};

// 保存资料
const handleSave = async () => {
  // 头像不能为空
  if (!userInfo.value.avatar) {
    uni.showToast({
      title: "请上传头像",
      icon: "none",
    });
    return;
  }

  if (!userInfo.value.name.trim()) {
    uni.showToast({
      title: "用户名不能为空",
      icon: "none",
    });
    return;
  }

  if (selectedTypes.value.length === 0) {
    uni.showToast({
      title: "请至少选择一个饮食喜好",
      icon: "none",
    });
    return;
  }
  console.log('2222', userInfo.value)

  try {
    // const avatarPath = userInfo.value.avatar.replace('http://localhost:3000', '');
    const res = await updateUser(userInfo.value.id, {
      name: userInfo.value.name,
      avatar: userInfo.value.avatar,
      preference: userInfo.value.preference,
    });
    uni.showToast({
      title: "保存成功",
      icon: "success",
    });
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  } catch (error) {
    uni.showToast({
      title: "保存失败",
      icon: "none",
    });
  }
};
</script>

<style lang="scss" scoped>
.edit-info {
  min-height: 100vh;
  background-color: #f8f8f8;
  position: relative;
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
    margin-left: 30rpx;
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

  :deep(.uni-input-input) {
    text-align: right;
  }

  :deep(.uni-input-placeholder) {
    text-align: right;
  }

  &.food-type {
    display: flex;
    align-items: flex-start;

    .food-type-list {
      margin-left: 30rpx;
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

.bottom-button {
  margin: 48rpx 40rpx;
  margin-bottom: calc(48rpx + env(safe-area-inset-bottom));
}

.required {
  color: #ff4d4f;
  margin-left: 4rpx;
}
</style>
