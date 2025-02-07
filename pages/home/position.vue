<template>
  <view class="position-content">
    <WaterfallFlow :list="list" :column-count="2" :column-gap="30" :loading="loading">
    </WaterfallFlow>
    <wd-fab :expandable="false" inactiveIcon="location" @click="handleChooseLocation" :disabled="loading"></wd-fab>
  </view>
</template>

<script setup>
import { ref, watch } from "vue";
import { onShow, onLoad } from "@dcloudio/uni-app";
import { foodBysearchByLocation,food } from "@/api/food";
import WaterfallFlow from "../component/WaterfallFlow.vue";

const emit = defineEmits(["update-location"]);

const props = defineProps({
  initialCoordinates: {
    type: Object,
    default: () => null
  }
});

// 监听初始坐标变化
watch(() => props.initialCoordinates, (newCoords) => {
  if (newCoords) {
    getFoodList(newCoords.longitude, newCoords.latitude);
  }
}, { immediate: true });

const list = ref([]);
const loading = ref(false);

// 获取食物列表的方法
const getFoodList = async (longitude, latitude) => {
  if (!longitude || !latitude) {
    console.log('缺少经纬度信息');
    return;
  }

  loading.value = true;
  try {
    const res = await foodBysearchByLocation( latitude,longitude);
	// const res = await food();
    list.value = res

  } catch (error) {
    console.error("获取食物列表失败:", error);
    uni.showToast({
      title: '获取食物列表失败',
      icon: 'error'
    });
  } finally {
    loading.value = false;
  }
};


// 处理选择位置
const handleChooseLocation = () => {
  uni.chooseLocation({
    success: (res) => {
      loading.value = true;
      // 使用选择的位置更新食物列表
      getFoodList(res.longitude, res.latitude);

      // 更新位置信息
      emit("update-location", res.name || "当前位置");

      uni.showToast({
        title: '位置已更新',
        icon: 'success'
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