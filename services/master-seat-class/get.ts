import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterSeatClassListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  export_data: z.boolean().optional(),
})
export type MasterSeatClassListParams = z.infer<typeof MasterSeatClassListParamsSchema>

export const MasterSeatClassListItemSchema = z.object({
  id: z.string(),
  code: z.string().nullable(),
  name: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type MasterSeatClassListItem = z.infer<typeof MasterSeatClassListItemSchema>

export const MasterSeatClassListResponseSchema = httpGetListResponseSchemaBuilder(MasterSeatClassListItemSchema)
export type MasterSeatClassListResponse = z.infer<typeof MasterSeatClassListResponseSchema>

export const getList = async <ResponseType = MasterSeatClassListResponse>({
  params,
  options,
}: {
  params: MasterSeatClassListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/seat_class',
  })
  return response?.data
}
