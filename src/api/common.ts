import { AxiosRequestConfig } from 'axios'
import { fetchApi } from 'src/utils/axios'
import { RequestOptions } from 'src/utils/axios/interface'

export default {
  getMockList(config: AxiosRequestConfig, options?: RequestOptions) {
    return fetchApi.get({ url: '/mock/list', ...config }, options)
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(axios.getApi('/mock/list', params, config))
    //   }, 3000)
    // })
  },
}
