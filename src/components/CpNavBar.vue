<script setup lang="ts">
interface Props {
  title?: string
  rightText?: string
}

// 接收父组件的值
defineProps<Props>()

interface Emits {
  (e: 'click-right'): void
}
const emit = defineEmits<Emits>()
</script>

<template>
  <van-nav-bar
    left-arrow
    fixed
    placeholder
    :title="title"
    :right-text="rightText"
    @click-right="emit('click-right')"
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
