<template>
  <view class="recommend-container">
    <wd-navbar fixed placeholder title="推荐美食" safeAreaInsetTop></wd-navbar>

    <view class="form-container">
      <!-- 美食名称 -->
      <wd-input
        v-model="formData.title"
        label="美食名称"
        label-width="140rpx"
        placeholder="请输入美食名称"
        clearable
      />

      <!-- 商家名称 -->
      <wd-input
        v-model="formData.shopName"
        label="商家名称"
        label-width="140rpx"
        placeholder="请输入商家名称"
        clearable
      />

      <!-- 店铺位置 -->
      <wd-input
        v-model="formData.location"
        label="店铺位置"
        label-width="140rpx"
        placeholder="请选择店铺地址"
        right-icon="location"
        readonly
        @click="chooseLocation"
      />

      <!-- 评分 -->
      <wd-cell-group>
        <wd-cell title="评分" title-width="140rpx">
          <view class="rating-content">
            <wd-rate
              v-model="formData.rating"
              :max="5"
              :size="18"
              active-color="#FFC600"
            />
            <text class="rating-text">{{ formData.rating.toFixed(1) }}</text>
          </view>
        </wd-cell>
      </wd-cell-group>

      <!-- 食物类型 -->
      <wd-cell-group>
        <wd-cell
          title="食物类型"
          title-width="140rpx"
          :value="formData.foodType || '请选择食物类型'"
          is-link
          @click="showFoodTypePicker = true"
        />
      </wd-cell-group>

      <!-- 食物类型选择器 -->
      <wd-picker
        v-model="showFoodTypePicker"
        :columns="foodTypes"
        @confirm="onFoodTypeConfirm"
        title="选择食物类型"
      />

      <!-- 推荐理由 -->
      <wd-textarea
        v-model="formData.description"
        label="推荐理由"
        label-width="140rpx"
        placeholder="请输入推荐理由"
        maxlength="200"
        show-count
      />

      <!-- 图片上传 -->
      <view class="upload-box">
        <text class="label">上传图片</text>
        <wd-upload
          v-model="formData.images"
          :max-count="9"
          multiple
          @success="onUploadSuccess"
        >
          <wd-button size="small" type="info">选择图片</wd-button>
        </wd-upload>
      </view>

      <!-- 提交按钮 -->
      <view class="submit-box">
        <wd-button type="warning" block @click="handleSubmit">提交</wd-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

// 表单数据
const formData = reactive({
  title: "",
  shopName: "",
  location: "",
  rating: 5,
  foodType: "",
  description: "",
  images: [],
});

// 食物类型选择器
const showFoodTypePicker = ref(false);
const foodTypes = [
  { label: "中餐", value: "chinese" },
  { label: "西餐", value: "western" },
  { label: "日料", value: "japanese" },
  { label: "韩餐", value: "korean" },
  { label: "甜点", value: "dessert" },
  { label: "饮品", value: "drinks" },
  { label: "小吃", value: "snacks" },
  { label: "其他", value: "others" },
];

// 选择位置
const chooseLocation = () => {
  uni.chooseLocation({
    success: (res) => {
      formData.location = res.address;
    },
  });
};

// 食物类型确认
const onFoodTypeConfirm = (value) => {
  formData.foodType = value.label;
};

// 图片上传成功
const onUploadSuccess = (res) => {
  console.log("上传成功：", res);
};

// 提交表单
const handleSubmit = () => {
  // 表单验证
  if (!formData.title) {
    uni.showToast({ title: "请输入美食名称", icon: "none" });
    return;
  }
  if (!formData.shopName) {
    uni.showToast({ title: "请输入商家名称", icon: "none" });
    return;
  }
  if (!formData.location) {
    uni.showToast({ title: "请选择店铺位置", icon: "none" });
    return;
  }
  if (!formData.foodType) {
    uni.showToast({ title: "请选择食物类型", icon: "none" });
    return;
  }
  if (!formData.description) {
    uni.showToast({ title: "请输入推荐理由", icon: "none" });
    return;
  }
  if (formData.images.length === 0) {
    uni.showToast({ title: "请上传至少一张图片", icon: "none" });
    return;
  }

  // TODO: 提交表单数据
  console.log("提交的表单数据：", formData);
  uni.showToast({ title: "提交成功", icon: "success" });
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
      margin-left: 8rpx;
      font-size: 24rpx;
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
