<template>
  <view class="home-container">
    <wd-navbar fixed placeholder title="美食推荐" safeAreaInsetTop></wd-navbar>

    <view class="content">
      <WaterfallFlow :list="list" :column-count="2" :column-gap="30">
        <template #item="{ item }">
          <FoodCard :item="item" />
        </template>
      </WaterfallFlow>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import WaterfallFlow from "../component/WaterfallFlow.vue";
import FoodCard from "../component/FoodCard.vue";

const list = ref([
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
  {
    title: "广州早茶 | 每天都要从一笼虾饺开始",
    image:
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&w=50&h=50",
    username: "粤式生活",
    rating: 4.7,
  },
  {
    title: "自制咖啡拉花，在家也能享受精致下午茶",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=50&h=50",
    username: "咖啡师小K",
    rating: 4.3,
  },
  {
    title: "超正宗的意大利披萨，薄脆可口",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&w=50&h=50",
    username: "披萨达人",
    rating: 4.6,
  },
  {
    title: "法式甜点 | 马卡龙的彩虹色诱惑",
    image:
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&w=50&h=50",
    username: "甜点控",
    rating: 4.8,
  },
  {
    title: "泰国街头美食，酸辣鲜香样样全",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&w=50&h=50",
    username: "泰式美食",
    rating: 4.4,
  },
  {
    title: "精致日式寿司拼盘，色香味俱全",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&w=50&h=50",
    username: "寿司匠人",
    rating: 4.9,
  },
  {
    title: "韩式部队锅，暖心又暖胃",
    image:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3",
    avatar:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&w=50&h=50",
    username: "韩食达人",
    rating: 4.7,
  },
]);

const handleItemClick = (item) => {
  uni.navigateTo({
    url: "/pages/detail/index",
  });
};
</script>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.content {
  padding: 20rpx;
}
</style>
