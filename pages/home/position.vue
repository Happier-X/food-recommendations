<template>
  <view class="position-content">
    <WaterfallFlow :list="list" :column-count="2" :column-gap="30">
    </WaterfallFlow>
    <wd-fab
      :expandable="false"
      inactiveIcon="location"
      @click="handleChooseLocation"
    ></wd-fab>
  </view>
</template>

<script setup>
import { ref } from "vue";
import WaterfallFlow from "../component/WaterfallFlow.vue";

const emit = defineEmits(["update-location"]);

const list = ref([]);

// 处理选择位置
const handleChooseLocation = () => {
  uni.chooseLocation({
    success: (res) => {
      // 使用高德地图搜索周边
      uni.request({
        url: "https://restapi.amap.com/v3/place/around",
        data: {
          key: "7e96a646059704d70e2c16243ee2b1d4",
          location: `${res.longitude},${res.latitude}`,
          keywords: "美食",
          types: "050000",
          radius: 3000,
          offset: 20,
          page: 1,
        },
        success: (result) => {
          console.log("周边美食：", result);
          if (result.data.status === "1") {
            // 更新列表数据
            list.value = result.data.pois.map((poi) => ({
              title: poi.name,
              image:
                "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3",
              avatar:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&w=50&h=50",
              username: poi.type.split(";")[0],
              rating: (Math.random() * (5 - 4) + 4).toFixed(1),
            }));

            // 获取地址信息并发送给父组件
            uni.request({
              url: "https://restapi.amap.com/v3/geocode/regeo",
              data: {
                key: "7e96a646059704d70e2c16243ee2b1d4",
                location: `${res.longitude},${res.latitude}`,
                extensions: "base",
                batch: false,
              },
              success: (addressResult) => {
                if (addressResult.data.status === "1") {
                  const addressComponent =
                    addressResult.data.regeocode.addressComponent;
                  emit("update-location", addressComponent.district || "附近");
                }
              },
            });
          }
          uni.showToast({
            title: "位置已更新",
            icon: "success",
          });
        },
        fail: (err) => {
          console.error("搜索周边失败：", err);
          uni.showToast({
            title: "获取周边信息失败",
            icon: "error",
          });
        },
      });
    },
    fail: (err) => {
      console.error("选择位置失败：", err);
      uni.showToast({
        title: "选择位置失败",
        icon: "error",
      });
    },
  });
};
</script>

<style lang="scss" scoped>
.position-content {
  padding: 20rpx;
}
</style>
