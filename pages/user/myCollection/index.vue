<template>
  <view class="my-collection">
    <!-- 导航栏 -->
    <wd-navbar
      fixed
      placeholder
      safeAreaInsetTop
      title="我的收藏"
      left-arrow
      @click-left="handleBack"
    ></wd-navbar>

    <!-- 收藏列表 -->
    <view class="collection-list">
      <WaterfallFlow
        v-if="collectionList.length > 0"
        :list="collectionList"
        :column-count="2"
        :column-gap="30"
      >
        <template #item="{ item }">
          <FoodCard :item="item" />
        </template>
      </WaterfallFlow>

      <!-- 空状态 -->
      <view v-else class="empty-state">
        <wd-icon name="warn-outline" size="48" />
        <text class="empty-text">暂无收藏记录</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import WaterfallFlow from "@/pages/component/WaterfallFlow.vue";
import FoodCard from "@/pages/component/FoodCard.vue";

// 收藏列表数据
const collectionList = ref([
  {
    title: "超级好吃的日式拉面，汤底浓郁，面条劲道",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&w=50&h=50",
    username: "美食达人",
    rating: 4.8,
  },
  {
    title: "探店 | 这家藏在巷子里的小店太惊艳了",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&w=50&h=50",
    username: "吃货小王",
    rating: 4.5,
  },
  {
    title: "重庆火锅太香了！麻辣鲜香，让人欲罢不能",
    image:
      "https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?ixlib=rb-4.0.3",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&w=50&h=50",
    username: "火锅控",
    rating: 4.9,
  },
]);

/**
 * 返回上一页
 */
const handleBack = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.my-collection {
  min-height: 100vh;
  background-color: #f7f7f7;
}

.collection-list {
  padding: 24rpx;
}

.empty-state {
  margin-top: 200rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24rpx;

  :deep(.wd-icon) {
    color: #ccc;
  }

  .empty-text {
    font-size: 28rpx;
    color: #999;
  }
}
</style>
