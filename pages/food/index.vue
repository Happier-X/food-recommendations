<template>
  <wd-navbar fixed placeholder title="发现美食" safeAreaInsetTop></wd-navbar>
  <view class="search-box">
    <wd-search
      v-model="searchValue"
      placeholder="搜索美食"
      background="#f5f5f5"
      shape="round"
    />
  </view>
  <wd-tabs v-model="tab" slidable="always">
    <block v-for="item in categoryList" :key="item.value">
      <wd-tab :title="`${item.label}`" style="padding: 0 20rpx">
        <WaterfallFlow :list="list" :column-count="2" :column-gap="30">
        </WaterfallFlow>
      </wd-tab>
    </block>
  </wd-tabs>
  <div>
    <!-- 显示食物列表 -->
    <div v-for="food in foodList" :key="food.id">
      {{ food.name }}
      <button @click="deleteFood(food.id)">删除</button>
    </div>

    <!-- 添加食物的表单 -->
    <form @submit.prevent="handleSubmit">
      <!-- 表单内容 -->
    </form>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { food } from "@/api/food";
import WaterfallFlow from "../component/WaterfallFlow.vue";
const tab = ref("全部");
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
const list = ref([]);

const foodList = ref([]);

// 获取食物列表的方法
const getFoodList = async () => {
  try {
    const res = await food();
    console.log(res);
    // foodList.value = data;
  } catch (error) {
    console.error("获取食物列表失败:", error);
  }
};

// 修改添加食物的方法
const addFood = async (foodData) => {
  try {
    const result = await post("/foods", foodData);
    await getFoodList();
    return result;
  } catch (error) {
    console.error("添加食物失败:", error);
    throw error;
  }
};

// 修改删除食物的方法
const deleteFood = async (foodId) => {
  try {
    await del(`/foods/${foodId}`);
    await getFoodList();
  } catch (error) {
    console.error("删除食物失败:", error);
    throw error;
  }
};

// 在组件挂载时获取食物列表
onMounted(() => {
  getFoodList();
});
</script>
<style lang="scss" scoped></style>
