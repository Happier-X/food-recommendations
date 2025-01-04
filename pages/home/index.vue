<template>
  <view class="home-container">
    <wd-navbar fixed placeholder title="美食推荐" safeAreaInsetTop></wd-navbar>

    <wd-tabs v-model="activeTab" sticky :offset-top="80">
      <wd-tab title="推荐">
        <recommend />
      </wd-tab>
      <wd-tab title="附近"></wd-tab>
    </wd-tabs>
  </view>
</template>

<script setup>
import recommend from "./recommend.vue";

</script>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}
</style>
