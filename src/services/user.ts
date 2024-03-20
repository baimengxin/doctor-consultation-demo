import request from '@/utils/request'

// 密码登录
export const loginApi = (mobile: string, password: string) => {
  return request({
    url: 'login/password',
    method: 'post',
    data: {
      mobile,
      password
    }
  })
}

// 获取手机验证码
export const sendCodeApi = (mobile: string, type = 'login') => {
  return request({
    url: 'code',
    params: { mobile, type }
  })
}

// 短信登录
export const loginByCodeApi = (mobile: string, code: string) => {
  return request({
    url: '/login',
    method: 'post',
    data: { mobile, code }
  })
}
