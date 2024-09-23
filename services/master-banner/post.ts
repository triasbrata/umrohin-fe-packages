import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const BannerCreateItemBodySchema = zfd.formData({
  name: zfd.text(),
  description: zfd.text(),
  image: zfd.file(),
  title: zfd.text(),
  link: zfd.text(),
})
export type BannerCreateItemBody = z.infer<typeof BannerCreateItemBodySchema>

export const BannerCreateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  title: z.string(),
  link: z.string(),
})
export type BannerCreateItemResult = z.infer<typeof BannerCreateItemResultSchema>

export const BannerCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(BannerCreateItemResultSchema)
export type BannerCreateItemResponse = z.infer<typeof BannerCreateItemResponseSchema>

export const createItem = async <ResponseType = BannerCreateItemResponse>({
  body,
  options,
}: {
  body: BannerCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'post',
    url: '/v1/banners',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
