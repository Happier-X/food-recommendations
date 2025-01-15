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
        v-if="list.length > 0"
        :list="list"
        :column-count="2"
        :column-gap="30"
      >
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
import { collectionList } from "@/api/collection";
import { onShow } from "@dcloudio/uni-app";

// 收藏列表数据
const list = ref([]);

onShow(async () => {
  const res = await collectionList();
  res.forEach((item) => {
    list.value.push(item.food);
  });
});

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
