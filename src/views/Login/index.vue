<script setup lang="ts">
import { loginApi } from '@/services/user'
import { useUserStore } from '@/stores'
import { codeRules, mobileRules, passwordRules } from '@/utils/rules'
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
const store = useUserStore()
// 验证码登录的显示隐藏
const isCode = ref(false)
const code = ref('')
// 验证码秒数
const second = ref(0)

// 验证码倒计时函数
const sendCode = () => {
  // 防止用户多次点击，频繁触发
  if (second.value > 0) return

  // 验证码发送时，初始为 60秒
  second.value = 60
  let timeId = setInterval(() => {
    second.value--

    // 秒数为 0，关闭定时器
    if (second.value === 0) {
      clearInterval(timeId)
    }
  }, 1000)
}

// 表单提交，通过校验规则后才会触发
const onSubmit = async () => {
  if (!isSelect.value) {
    return showToast('请勾选用户协议')
  }

  // 请求数据
  const res = await loginApi(mobile.value, password.value)

  // 存储本地
  localStorage.setItem('user', JSON.stringify(res.data))
  // 存储数据到 store 中
  store.saveUser(res.data)
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
      <h3>{{ isCode ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isCode = !isCode">
        <span>{{ isCode ? '短信验证码登录' : '密码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>

    <!-- form 表单 -->
    <van-form autocomplete="off" @submit="onSubmit">
      <!-- 手机号 -->
      <van-field
        v-model="mobile"
        :rules="mobileRules"
        placeholder="请输入手机号"
        type="tel"
      ></van-field>

      <!-- 请输入密码 -->
      <van-field
        v-show="isCode"
        v-model="password"
        :rules="passwordRules"
        placeholder="请输入密码"
        type="password"
      >
        <template #button>
          <div @click="isShow = !isShow">
            <CpIcon :name="isShow ? 'login-eye-off' : 'login-eye-on'" />
          </div>
        </template>
      </van-field>

      <!-- 验证码 -->
      <van-field
        v-show="!isCode"
        v-model="code"
        :rules="codeRules"
        placeholder="请输入验证码"
        type="digit"
      >
        <template #button>
          <span v-show="second === 0" class="btn-send" @click="sendCode">验证码发送</span>
          <span v-show="second > 0">{{ second }}s后再次发送</span>
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

  .btn-send {
    color: var(--cp-primary);
  }
}
</style>
