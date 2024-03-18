<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  title?: string
  rightText?: string
  onBack?: () => void
}

interface Emits {
  (e: 'click-right'): void
}

// 接收父组件的值
const props = defineProps<Props>()
// 子组件事件
const emit = defineEmits<Emits>()
// 路由
const router = useRouter()

// 封装 clcikLeft 函数，支持默认回退
const onClickLeft = () => {
  // 如果外部有传函数，则调用外部的函数
  if (props.onBack) {
    return props.onBack()
  }

  // 如果没有就调用路由回退
  router.back()
}
</script>

<template>
  <van-nav-bar
    fixed
    left-arrow
    placeholder
    :title="title"
    :right-text="rightText"
    @click-right="emit('click-right')"
    @click-left="onClickLeft"
  />
</template>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
