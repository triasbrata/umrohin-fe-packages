import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const ThematicListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
  export_data: z.boolean().optional(),
  is_active: z.boolean().optional(),
  sort_by: z.string().optional(),
  order_by: z.string().optional(),
})
export type ThematicListParams = z.infer<typeof ThematicListParamsSchema>

export const ThematicListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  is_active: z.boolean(),
})
export type ThematicListItem = z.infer<typeof ThematicListItemSchema>

export const ThematicListResponseSchema = httpGetListResponseSchemaBuilder(ThematicListItemSchema)
export type ThematicListResponse = z.infer<typeof ThematicListResponseSchema>

export const getList = async <ResponseType = ThematicListResponse>({
  params,
  options,
}: {
  params: ThematicListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/tema',
  })
  return response?.data
}
