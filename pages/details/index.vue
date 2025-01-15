<template>
  <view class="details-container">
    <!-- 顶部导航栏 -->
    <wd-navbar
      fixed
      safeAreaInsetTop
      placeholder
      title="美食详情"
      left-arrow
      @click-left="handleBack"
    ></wd-navbar>

    <!-- 图片轮播 -->
    <view class="swiper-container">
      <wd-swiper :list="foodInfo.images"></wd-swiper>
    </view>

    <!-- 内容区域 -->
    <view class="content-wrapper">
      <!-- 基本信息 -->
      <view class="info-section">
        <view class="title-row">
          <text class="title">{{ foodInfo.name }}</text>
          <view class="right-actions">
            <view class="rating">
              <text class="rating-text">{{ foodInfo.rating.toFixed(1) }}</text>
            </view>
            <view class="collect-btn" @click.stop="handleCollect">
              <wd-icon
                :name="isCollected ? 'star-filled' : 'star'"
                size="20"
                :color="isCollected ? '#ffc600' : '#999'"
              />
            </view>
          </view>
        </view>

        <view class="divider"></view>

        <!-- 推荐理由 -->
        <view class="reason-content">
          <text class="reason-text">{{ foodInfo.recommendation }}</text>
          <view class="recommender-info">
            <image
              :src="foodInfo.user.avatar"
              class="avatar"
              mode="aspectFill"
            />
            <text class="username">{{ foodInfo.user.name }}</text>
          </view>
        </view>
      </view>

      <!-- 商家信息 -->
      <view class="merchant-section">
        <view class="info-item">
          <wd-icon name="shop" size="16" />
          <text class="label">商家名称</text>
          <text class="value">{{ foodInfo.shopName }}</text>
        </view>

        <view class="info-item" @click="handleOpenLocation">
          <wd-icon name="location" size="16" />
          <text class="label">店铺位置</text>
          <text class="value">{{ foodInfo.location }}</text>
          <wd-icon name="arrow-right" size="16" class="arrow-icon" />
        </view>

        <view class="info-item">
          <wd-icon name="attach" size="16" />
          <text class="label">食物类型</text>
          <text class="value">{{
            foodTypes[foodInfo.foodType - 1].label
          }}</text>
        </view>
      </view>

      <!-- 评分系统 -->
      <view class="rating-section">
        <!-- 用户评分输入 -->
        <view class="rating-input">
          <view class="rating-stars">
            <wd-rate
              v-model="userRating"
              :size="24"
              @change="handleRatingChange"
            />
            <text class="rating-tip">点击星星评分</text>
          </view>
        </view>

        <view class="divider"></view>

        <!-- 评分统计 -->
        <view class="rating-stats">
          <view class="stats-left">
            <text class="average-score">{{ foodInfo.rating.toFixed(1) }}</text>
            <view class="total-rating">
              <wd-rate :model-value="foodInfo.rating" :size="12" disabled />
              <text class="rating-count">{{ ratingList.length }}条评分</text>
            </view>
          </view>
          <view class="stats-right">
            <view
              class="rating-bar"
              v-for="(item, index) in ratingBars"
              :key="index"
            >
              <text class="star-count">{{ 5 - index }}星</text>
              <view class="bar-wrapper">
                <view class="bar-bg">
                  <view
                    class="bar-fill"
                    :style="{ width: item.percentage + '%' }"
                  ></view>
                </view>
              </view>
              <text class="percentage">{{ item.percentage }}%</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 悬浮按钮 -->
    <wd-fab v-if="showActions">
      <wd-button
        @click="handleEdit"
        custom-class="custom-button"
        type="primary"
        round
      >
        <wd-icon name="edit" size="22px"></wd-icon>
      </wd-button>
      <wd-button
        @click="handleDelete"
        custom-class="custom-button"
        type="warning"
        round
      >
        <wd-icon name="delete1" size="22px"></wd-icon>
      </wd-button>
    </wd-fab>
    <wd-message-box />
  </view>
</template>

<script setup>
import { foodDetail, deleteFood } from "@/api/food";
import { useMessage } from "@/uni_modules/wot-design-uni";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { computed, ref } from "vue";
import { getUserInfo } from "@/api/user";
import { createCollection } from "@/api/collection";

const foodId = ref("");

onLoad(async (options) => {
  foodId.value = options.id;
  await getFoodDetail();
  await getUser();
  showActions.value = foodInfo.value.userId === userInfo.value.id;
  isCollected.value = foodInfo.value.isCollected;
});

onShow(async () => {
  await getFoodDetail();
  await getUser();
  showActions.value = foodInfo.value.userId === userInfo.value.id;
  isCollected.value = foodInfo.value.isCollected;
});

async function getFoodDetail() {
  const res = await foodDetail(foodId.value);
  foodInfo.value = res;
}

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

// 返回上一页
const handleBack = () => {
  uni.navigateBack();
};

// 处理函数
const handleOpenLocation = () => {
  // 这里需要真实的经纬度数据
  uni.openLocation({
    latitude: 23.13171, // 天河区体育西路的大致纬度
    longitude: 113.32452, // 天河区体育西路的大致经度
    name: foodInfo.value.shopName,
    address: foodInfo.value.location,
    success: () => {},
    fail: (err) => {
      uni.showToast({
        title: "打开地图失败",
        icon: "none",
      });
      console.error("打开地图失败:", err);
    },
  });
};

const foodInfo = ref({});

const isCollected = ref(false);

const handleCollect = async () => {
  isCollected.value = !isCollected.value;
  const res = await createCollection({
    foodId: foodId.value,
  });
  uni.showToast({
    title: res.message,
    icon: "none",
  });
};

// 用户评分
const userRating = ref(3);

// 处理用户评分变化
const handleRatingChange = (value) => {
  userRating.value = value;
  uni.showToast({
    title: "评分成功",
    icon: "success",
  });
};

// 模拟评分数据
const ratingList = ref([
  {
    username: "用户1",
    avatar:
      "https://registry.npmmirror.com/wot-design-uni-assets/*/files/avatar.jpg",
    rating: 5,
    time: "2024-01-20",
  },
  {
    username: "用户2",
    avatar:
      "https://registry.npmmirror.com/wot-design-uni-assets/*/files/avatar.jpg",
    rating: 4,
    time: "2024-01-19",
  },
  {
    username: "用户3",
    avatar:
      "https://registry.npmmirror.com/wot-design-uni-assets/*/files/avatar.jpg",
    rating: 5,
    time: "2024-01-18",
  },
]);

// 计算评分统计
const ratingBars = computed(() => {
  const total = ratingList.value.length;
  const counts = [0, 0, 0, 0, 0];

  ratingList.value.forEach((item) => {
    counts[5 - item.rating]++;
  });

  return counts.map((count) => ({
    percentage: total ? Math.round((count / total) * 100) : 0,
  }));
});

// 用户信息
const userInfo = ref({});

// 获取用户信息
const getUser = async () => {
  const res = await getUserInfo();
  userInfo.value = res;
};

// 是否显示操作按钮
const showActions = ref(false);

// 编辑推荐
const handleEdit = () => {
  uni.navigateTo({
    url: `/pages/details/editFood?id=${foodId.value}`,
  });
};

// 消息
const message = useMessage();

// 删除推荐
const handleDelete = () => {
  message
    .confirm({
      title: "提示",
      msg: "确定要删除这条推荐吗？",
    })
    .then(async () => {
      const res = await deleteFood(foodId.value);
      uni.showToast({
        title: res.message,
        icon: "success",
        success: () => {
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        },
      });
    })
    .catch(() => {});
};
</script>

<style lang="scss" scoped>
// 添加文本溢出省略号的 mixin
@mixin text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.details-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.swiper-container {
  padding: 24rpx;
}

.content-wrapper {
  padding: 24rpx;
}

.info-section {
  background: #fff;
  border-radius: 24rpx;
  padding: 40rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

  .title-row {
    margin-bottom: 32rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .title {
      @include text-ellipsis;
      font-size: 44rpx;
      font-weight: 600;
      color: #333;
      line-height: 1.4;
      flex: 1;
      margin-right: 24rpx;
    }

    .right-actions {
      display: flex;
      align-items: center;
      gap: 24rpx;
      flex-shrink: 0;

      .rating {
        display: inline-block;
        background: rgba(255, 198, 0, 0.1);
        padding: 4rpx 20rpx;
        border-radius: 6rpx;

        .rating-text {
          font-size: 28rpx;
          color: #ffc600;
          font-weight: 600;
        }
      }

      .collect-btn {
        padding: 8rpx;

        &:active {
          opacity: 0.7;
        }
      }
    }
  }

  .reason-content {
    padding: 24rpx 0;

    .reason-text {
      font-size: 30rpx;
      color: #666;
      line-height: 1.8;
      text-align: justify;
      letter-spacing: 0.5rpx;
    }

    .recommender-info {
      display: flex;
      align-items: center;
      gap: 12rpx;
      justify-content: flex-end;
      margin-top: 24rpx;

      .avatar {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
      }

      .username {
        font-size: 24rpx;
        color: #999;
      }
    }
  }

  .divider {
    height: 2rpx;
    background: #f5f5f5;
    margin: 32rpx 0;
  }
}

.merchant-section {
  background: #fff;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

  .info-item {
    display: flex;
    align-items: center;
    padding: 20rpx 0;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }

    .wd-icon {
      font-size: 36rpx;
      color: #ffc600;
      margin-right: 16rpx;
      width: 36rpx;
      height: 36rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .label {
      font-size: 28rpx;
      color: #999;
      width: 160rpx;
    }

    .value {
      @include text-ellipsis;
      font-size: 28rpx;
      color: #333;
      flex: 1;
    }

    // 添加指示箭头样式
    .arrow-icon {
      font-size: 32rpx;
      color: #999;
      margin-left: 8rpx;
    }

    // 添加点击效果
    &:active {
      opacity: 0.7;
    }
  }
}

.rating-section {
  background: #fff;
  border-radius: 24rpx;
  padding: 40rpx;
  margin-top: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

  .rating-input {
    .rating-stars {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16rpx;

      .rating-tip {
        font-size: 24rpx;
        color: #999;
      }
    }
  }

  .rating-stats {
    display: flex;
    padding: 32rpx 0;
    align-items: center;

    .stats-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-right: 48rpx;
      border-right: 2rpx solid #f5f5f5;
      justify-content: center;

      .average-score {
        font-size: 48rpx;
        font-weight: 600;
        color: #333;
        line-height: 1;
        margin-bottom: 16rpx;
      }

      .total-rating {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8rpx;

        .rating-count {
          font-size: 24rpx;
          color: #999;
        }
      }
    }

    .stats-right {
      flex: 1;
      padding-left: 48rpx;

      .rating-bar {
        display: flex;
        align-items: center;
        margin-bottom: 12rpx;

        &:last-child {
          margin-bottom: 0;
        }

        .star-count {
          font-size: 24rpx;
          color: #999;
          width: 60rpx;
        }

        .bar-wrapper {
          flex: 1;
          margin: 0 16rpx;

          .bar-bg {
            height: 12rpx;
            background: #f5f5f5;
            border-radius: 6rpx;
            overflow: hidden;

            .bar-fill {
              height: 100%;
              background: #ffc600;
              border-radius: 6rpx;
              transition: width 0.3s ease;
            }
          }
        }

        .percentage {
          font-size: 24rpx;
          color: #999;
          width: 60rpx;
          text-align: right;
        }
      }
    }
  }

  .divider {
    height: 2rpx;
    background: #f5f5f5;
    margin: 32rpx 0;
  }
}
:deep(.custom-button) {
  min-width: auto !important;
  box-sizing: border-box;
  width: 32px !important;
  height: 32px !important;
  border-radius: 16px !important;
  margin: 8rpx;
}
</style>
