import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterStatusHistoryListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_active: z.boolean().optional(),
  order_by: z.string().optional(),
  sort_by: z.string().optional(),
})
export type MasterStatusHistoryListParams = z.infer<typeof MasterStatusHistoryListParamsSchema>

export const MasterStatusHistoryListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  order: z.number(),
  is_active: z.boolean(),
})
export type MasterStatusHistoryListItem = z.infer<typeof MasterStatusHistoryListItemSchema>

export const MasterStatusHistoryListResponseSchema = httpGetListResponseSchemaBuilder(MasterStatusHistoryListItemSchema)
export type MasterStatusHistoryListResponse = z.infer<typeof MasterStatusHistoryListResponseSchema>

export const getList = async <ResponseType = MasterStatusHistoryListResponse>({
  params,
  options,
}: {
  params: MasterStatusHistoryListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/status_history',
  })
  return response?.data
}
