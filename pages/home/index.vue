<template>
  <view class="home-container">
    <wd-navbar fixed placeholder title="美食推荐" safeAreaInsetTop></wd-navbar>

    <wd-tabs v-model="activeTab" sticky :offset-top="80">
      <wd-tab title="推荐">
        <recommend />
      </wd-tab>
      <wd-tab :title="locationTitle">
        <position @update-location="updateLocationTitle" />
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

// 更新位置标题
const updateLocationTitle = (newLocation) => {
  locationTitle.value = newLocation;
};

onMounted(() => {
  // 获取用户位置
  uni.getLocation({
    type: 'gcj02',
    success: (res) => {
      // 使用高德地图逆地理编码
      uni.request({
        url: 'https://restapi.amap.com/v3/geocode/regeo',
        data: {
          key: '7e96a646059704d70e2c16243ee2b1d4',
          location: `${res.longitude},${res.latitude}`,
          extensions: 'base',
          batch: false
        },
        success: (result) => {
          if (result.data.status === '1') {
            const addressComponent = result.data.regeocode.addressComponent;
            locationTitle.value = addressComponent.district || '附近';
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
