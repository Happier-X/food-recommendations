<template>
  <view class="recommend-container">
    <wd-navbar fixed placeholder title="推荐美食" safeAreaInsetTop></wd-navbar>

    <view class="form-container">
      <!-- 美食名称 -->
      <wd-input v-model="formData.title" label="美食名称" label-width="140rpx" placeholder="请输入美食名称" clearable />

      <!-- 商家名称 -->
      <wd-input v-model="formData.shopName" label="商家名称" label-width="140rpx" placeholder="请输入商家名称" clearable />

      <!-- 店铺位置 -->
      <wd-input v-model="formData.location" label="店铺位置" label-width="140rpx" placeholder="请选择店铺地址"
        right-icon="location" readonly @click="chooseLocation" />

      <!-- 评分 -->
      <wd-cell-group>
        <wd-cell title="评分" title-width="140rpx">
          <view class="rating-content">
            <wd-rate v-model="formData.rating" :max="5" :size="18" space="18rpx" active-color="#FFC600" />
            <text class="rating-text">{{ formData.rating.toFixed(1) }}</text>
          </view>
        </wd-cell>
      </wd-cell-group>

      <!-- 食物类型 -->
      <wd-cell-group>
        <!-- 食物类型选择器 -->
        <wd-picker v-model="formData.foodType" :columns="foodTypes" title="选择食物类型" label="食物类型" label-width="140rpx"
          @confirm="onFoodTypeConfirm" @cancel="onFoodTypeCancel" />
      </wd-cell-group>

      <!-- 推荐理由 -->
      <wd-textarea v-model="formData.description" label="推荐理由" label-width="140rpx" placeholder="请输入推荐理由"
        maxlength="200" show-count />

      <!-- 图片上传 -->
      <view class="upload-box">
        <text class="label">上传图片</text>
        <wd-upload accept="image" v-model:file-list="formData.imageUrl" :limit="3" multiple :action="action"
          @success="handleUploadSuccess" @fail="handleUploadFail" :header="header" :successStatus="201">
        </wd-upload>
      </view>

      <!-- 提交按钮 -->
      <view class="submit-box">
        <wd-button type="primary" block @click="handleSubmit">提交</wd-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { createFood } from "../../api/food";

const action = "http://localhost:3000/upload";
const header = {
  Authorization: `Bearer ${uni.getStorageSync("token")}`,
};
// 表单数据
const formData = ref({
  title: "",
  shopName: "",
  location: "",
  rating: 5,
  foodType: "",
  description: "",
  imageUrl: "",
});

const foodTypes = [
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
];

// 选择位置
const chooseLocation = () => {
  uni.chooseLocation({
    success: (res) => {
      formData.value.location = res.address;
      // 保存经纬度信息
      formData.value.latitude = res.latitude;
      formData.value.longitude = res.longitude;
    },
    fail: () => {
      uni.showToast({
        title: "选择位置失败",
        icon: "none",
      });
    },
  });
  // formData.value.location = "北京市海淀区中关村大街";
};

// 食物类型确认
const onFoodTypeConfirm = (value) => {
  formData.value.foodType = value.value;
};

// 上传成功
const handleUploadSuccess = (res) => {
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

// 提交表单
const handleSubmit = async () => {
  // 表单验证
  if (!formData.value.title) {
    uni.showToast({ title: "请输入美食名称", icon: "none" });
    return;
  }
  if (!formData.value.shopName) {
    uni.showToast({ title: "请输入商家名称", icon: "none" });
    return;
  }
  if (!formData.value.location) {
    uni.showToast({ title: "请选择店铺位置", icon: "none" });
    return;
  }
  if (!formData.value.foodType) {
    uni.showToast({ title: "请选择食物类型", icon: "none" });
    return;
  }
  if (!formData.value.description) {
    uni.showToast({ title: "请输入推荐理由", icon: "none" });
    return;
  }
  try {
    await createFood({
      name: formData.value.title,
      shopName: formData.value.shopName,
      location: formData.value.location,
      rating: formData.value.rating,
      foodType: formData.value.foodType,
      recommendation: formData.value.description,
      imageUrl: formData.value.imageUrl,
    });
    uni.showToast({ title: "提交成功", icon: "none" });
    formData.value = {
      title: "",
      shopName: "",
      location: "",
      rating: 5,
      foodType: "",
      description: "",
      imageUrl: "",
    };
  } catch (error) {
    uni.showToast({ title: "提交失败", icon: "none" });
  }
};
</script>

<style lang="scss" scoped>
.recommend-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.form-container {
  padding: 20rpx;

  .wd-input,
  .wd-cell-group {
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 8rpx;

    :deep(.uni-input-input) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .rating-content {
    display: flex;
    align-items: center;
    padding-right: 8rpx;

    .rating-text {
      margin-left: 12rpx;
      font-size: 32rpx;
      color: #ffc600;
      min-width: 32rpx;
    }
  }

  .upload-box {
    margin-bottom: 20rpx;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 8rpx;

    .label {
      display: block;
      font-size: 28rpx;
      color: #333;
      margin-bottom: 16rpx;
    }

    :deep(.wd-upload) {
      margin-top: 16rpx;
    }
  }

  .submit-box {
    margin-top: 40rpx;
    padding: 0 20rpx 40rpx;
  }
}

.rating-content {
  display: flex;
  align-items: center;

  .rating-text {
    margin-left: 12rpx;
    font-size: 26rpx;
    color: #ffc600;
  }
}
</style>
