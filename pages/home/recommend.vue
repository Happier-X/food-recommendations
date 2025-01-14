<template>
  <view class="content">
    <WaterfallFlow :list="list" :column-count="2" :column-gap="30">
    </WaterfallFlow>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { food } from "@/api/food";
import WaterfallFlow from "../component/WaterfallFlow.vue";

const list = ref([]);
// 获取食物列表的方法
const getFoodList = async () => {
  try {
    const res = await food();
    list.value = res;
  } catch (error) {
    console.error("获取食物列表失败:", error);
  }
};

// 在组件挂载时获取食物列表
onMounted(() => {
  getFoodList();
});
</script>

<style lang="scss" scoped>
.content {
  padding: 20rpx;
}
</style>
