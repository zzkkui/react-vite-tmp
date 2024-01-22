import Mockjs from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from './_util'

export default [
  {
    url: '/ajax/mock/list',
    timeout: 1000,
    method: 'get',
    response: (_config) => {
      const data = Mockjs.mock({
        'array|1-3': ['aaa', 'bbb', 'ccc'],
      })
      return resultSuccess(data)
    },
  },
] as MockMethod[]
