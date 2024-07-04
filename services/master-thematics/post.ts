import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const ThematicCreateItemBodySchema = zfd.formData({
  name: zfd.text(),
  description: zfd.text(),
  image: zfd.file(),
})
export type ThematicCreateItemBody = z.infer<typeof ThematicCreateItemBodySchema>

export const ThematicCreateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
})
export type ThematicCreateItemResult = z.infer<typeof ThematicCreateItemResultSchema>

export const ThematicCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(ThematicCreateItemResultSchema)
export type ThematicCreateItemResponse = z.infer<typeof ThematicCreateItemResponseSchema>

export const createItem = async <ResponseType = ThematicCreateItemResponse>({
  body,
  options,
}: {
  body: ThematicCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'post',
    url: '/v1/tema',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
