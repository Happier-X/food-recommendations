<template>
  <view class="home-container">
    <wd-navbar fixed placeholder title="美食推荐" safeAreaInsetTop></wd-navbar>

    <wd-tabs v-model="activeTab" sticky :offset-top="80">
      <wd-tab title="推荐">
        <recommend />
      </wd-tab>
      <wd-tab :title="locationTitle">
        <position />
      </wd-tab>
    </wd-tabs>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import recommend from "./recommend.vue";
import position from "./position.vue";

const activeTab = ref(0);
const locationTitle = ref('附近');

onMounted(() => {
  // 获取用户位置
  uni.getLocation({
    type: 'gcj02',
    success: (res) => {
      // 使用逆地理编码获取位置信息
      uni.request({
        url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${res.latitude},${res.longitude}&key=YOUR_KEY`,
        success: (result) => {
          console.log(result)
          if (result.data.status === 0) {
            const address = result.data.result.address_component;
            locationTitle.value = `${address.district || '附近'}`;
          }
        },
        fail: () => {
          locationTitle.value = '附近';
        }
      });
    },
    fail: () => {
      locationTitle.value = '附近';
    }
  });
});
</script>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}
</style>
