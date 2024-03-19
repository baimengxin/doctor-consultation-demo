import request from '@/utils/request'

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
