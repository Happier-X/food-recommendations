<template>
  <wd-navbar fixed placeholder title="发现美食" safeAreaInsetTop></wd-navbar>
  <view class="search-box">
    <wd-search
      v-model="searchValue"
      placeholder="搜索美食"
      background="#f5f5f5"
      shape="round"
      @search="handleSearch"
      @cancel="handleCancel"
    />
  </view>
  <wd-tabs v-model="tab" slidable="always" @change="handleTabChange">
    <block v-for="item in categoryList" :key="item.value">
      <wd-tab :title="`${item.label}`" style="padding: 0 20rpx">
        <view v-if="!foodList.length" class="empty-state">
          <image src="/static/empty.png" mode="aspectFit" class="empty-image" />
          <text class="empty-text">暂无相关美食~</text>
        </view>
        <WaterfallFlow
          v-else
          :list="foodList"
          :column-count="2"
          :column-gap="30"
        >
        </WaterfallFlow>
      </wd-tab>
    </block>
  </wd-tabs>
</template>
<script setup>
import { foodBySearch } from "@/api/food";
import { ref } from "vue";
import WaterfallFlow from "../component/WaterfallFlow.vue";
const tab = ref("0");
const categoryList = ref([
  { value: "0", label: "全部" },
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
// 食物列表
const foodList = ref([]);
// 搜索值
const searchValue = ref("");
// 当前tab
const currentTab = ref("");
function handleTabChange(e) {
  currentTab.value = e;
  getFoodList();
}
// 获取食物列表
const getFoodList = async () => {
  try {
    const res = await foodBySearch(
      categoryList.value[currentTab.value.index].value,
      searchValue.value
    );
    foodList.value = res;
  } catch (error) {
    console.error("获取食物列表失败:", error);
  }
};

// 搜索
const handleSearch = async (e) => {
  if (!e.value) {
    uni.showToast({
      title: "请输入搜索内容",
      icon: "none",
    });
    return;
  }
  searchValue.value = e.value;
  getFoodList();
};

// 取消搜索
const handleCancel = async () => {
  try {
    searchValue.value = "";
    getFoodList();
  } catch (error) {
    console.error("获取食物列表失败:", error);
    uni.showToast({
      title: "获取列表失败",
      icon: "none",
    });
  }
};
</script>
<style lang="scss" scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60rpx 0;

  .empty-image {
    width: 240rpx;
    height: 240rpx;
    margin-bottom: 20rpx;
  }

  .empty-text {
    font-size: 28rpx;
    color: #999;
  }
}

.search-box {
  padding: 20rpx;
}
</style>
