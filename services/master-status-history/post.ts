import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterStatusHistoryCreateItemBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  order: z.number(),
  is_active: z.boolean(),
})
export type MasterStatusHistoryCreateItemBody = z.infer<typeof MasterStatusHistoryCreateItemBodySchema>

export const MasterStatusHistoryCreateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  order: z.number(),
  is_active: z.boolean(),
})
export type MasterStatusHistoryCreateItemResult = z.infer<typeof MasterStatusHistoryCreateItemResultSchema>

export const MasterStatusHistoryCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterStatusHistoryCreateItemResultSchema
)
export type MasterStatusHistoryCreateItemResponse = z.infer<typeof MasterStatusHistoryCreateItemResponseSchema>

export const createItem = async <ResponseType = MasterStatusHistoryCreateItemResponse>({
  body,
  options,
}: {
  body: MasterStatusHistoryCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: '/v1/status_history',
  })
  return response?.data
}
