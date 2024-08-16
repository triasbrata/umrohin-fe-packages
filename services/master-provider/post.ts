import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const MasterProviderCreateItemBodySchema = zfd.formData({
  name: zfd.text(),
  pic_name: zfd.text(),
  pic_phone: zfd.text(),
  address: zfd.text(),
  type: zfd.text(),
})

export type MasterProviderCreateItemBody = z.infer<typeof MasterProviderCreateItemBodySchema>

export const MasterProviderCreateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  pic_name: z.string(),
  pic_phone: z.string(),
  address: z.string(),
  type: z.string(),
})

export type MasterProviderCreateItemResult = z.infer<typeof MasterProviderCreateItemResultSchema>

export const MasterProviderCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterProviderCreateItemResultSchema.nullable()
)
export type MasterProviderCreateItemResponse = z.infer<typeof MasterProviderCreateItemResponseSchema>

export const createItem = async <ResponseType = MasterProviderCreateItemResponse>({
  body,
  options,
}: {
  body: MasterProviderCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: '/v1/ticket_providers',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response?.data
}
