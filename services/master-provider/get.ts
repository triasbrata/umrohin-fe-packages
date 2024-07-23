import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterProviderListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type MasterProviderListParams = z.infer<typeof MasterProviderListParamsSchema>

export const MasterProviderListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  pic_name: z.string(),
  pic_phone: z.string(),
  address: z.string(),
  type: z.string(),
  is_active: z.boolean(),
})
export type MasterProviderListItem = z.infer<typeof MasterProviderListItemSchema>

export const MasterProviderListResponseSchema = httpGetListResponseSchemaBuilder(MasterProviderListItemSchema)
export type MasterProviderListResponse = z.infer<typeof MasterProviderListResponseSchema>

export const getList = async <ResponseType = MasterProviderListResponse>({
  params,
  options,
}: {
  params: MasterProviderListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/ticket_providers',
  })
  return response?.data
}
