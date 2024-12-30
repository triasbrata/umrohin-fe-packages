import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const TokohCreateItemBodySchema = zfd.formData({
  name: zfd.text(),
  type: zfd.text(),
  featured_image: zfd.file(),
  quote: z.string(),
  biografi: z.string(),
})

export type TokohCreateItemBody = z.infer<typeof TokohCreateItemBodySchema>

export const TokohCreateItemResultSchema = z.object({
  name: z.string(),
  type: z.string(),
  featured_image: z.string(),
  quote: z.string(),
  biografi: z.string(),
})
export type TokohCreateItemResult = z.infer<typeof TokohCreateItemResultSchema>

export const TokohCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(TokohCreateItemResultSchema)
export type TokohCreateItemResponse = z.infer<typeof TokohCreateItemResponseSchema>

export const createTokohItem = async <ResponseType = TokohCreateItemResponse>({
  body,
  options,
}: {
  body: TokohCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    if (typeof value === 'object') formData.append(key, value)
    else formData.append(key, value.toString())
  })

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'post',
    url: '/v1/tokoh',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
