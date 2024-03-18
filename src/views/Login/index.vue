<script setup lang="ts">
import { ref } from 'vue'

const gender = ref(0)
</script>

<template>
  <div class="login-page">
    <CpNavBar title="登录" right-text="注册" />
    <CpRadioBtn
      v-model="gender"
      :options="[
        { label: '男', value: 0 },
        { label: '女', value: 1 },
        { label: '未知', value: 2 }
      ]"
    />
    <svg aria-hidden="true">
      <!-- #icon-文件夹名称-图片名称 -->
      <use href="#icon-login-eye-off" />
    </svg>
  </div>
</template>

<style lang="scss" scoped></style>
