<script setup lang="ts">
import { loginApi } from '@/services/user'
import { mobileRules, passwordRules } from '@/utils/rules'
import { showToast } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// 表单校验
const mobile = ref('13230000001')
const password = ref('abc12345')
// 密码显示隐藏
const isShow = ref(true)
// 是否同意
const isSelect = ref(false)
const router = useRouter()

// 表单提交，通过校验规则后才会触发
const onSubmit = async () => {
  if (!isSelect.value) {
    return showToast('请勾选用户协议')
  }

  // 请求数据
  const res = await loginApi(mobile.value, password.value)

  // 存储本地
  localStorage.setItem('user', JSON.stringify(res.data))
  // 提示用户
  showToast('登录成功')
  // 跳转路由
  router.push('/')
}
</script>

<template>
  <div class="login-page">
    <!-- 导航栏 -->
    <cp-nav-bar right-text="注册"></cp-nav-bar>

    <div class="login-head">
      <h3>密码登录</h3>
      <a href="javascript:;">
        <span>短信验证码登录</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>

    <!-- form 表单 -->
    <van-form autocomplete="off" @submit="onSubmit">
      <van-field
        v-model="mobile"
        :rules="mobileRules"
        placeholder="请输入手机号"
        type="tel"
      ></van-field>
      <van-field v-model="password" :rules="passwordRules" placeholder="请输入密码" type="password">
        <template #button>
          <div @click="isShow = !isShow">
            <CpIcon :name="isShow ? 'login-eye-off' : 'login-eye-on'" />
          </div>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="isSelect">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>

    <!-- 第三方登录 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
}
</style>
