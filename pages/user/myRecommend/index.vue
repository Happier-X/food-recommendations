<template>
  <view class="my-recommend">
    <!-- 导航栏 -->
    <wd-navbar
      fixed
      placeholder
      safeAreaInsetTop
      title="我的推荐"
      left-arrow
      @click-left="handleBack"
    ></wd-navbar>

    <!-- 推荐列表 -->
    <view class="recommend-list">
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
        <text class="empty-text">暂无推荐记录</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import WaterfallFlow from "@/pages/component/WaterfallFlow.vue";
import { recommendList } from "@/api/user";
// 推荐列表数据
const list = ref([]);
async function getRecommendList() {
  const res = await recommendList();
  list.value = res;
}
onShow(() => {
  getRecommendList();
});
/**
 * 返回上一页
 */
const handleBack = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.my-recommend {
  min-height: 100vh;
  background-color: #f7f7f7;
}

.recommend-list {
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
