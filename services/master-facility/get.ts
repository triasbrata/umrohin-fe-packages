import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterFacilityListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  export_data: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  is_active: z.boolean().optional(),
  sort_by: z.string().optional(),
  order_by: z.string().optional(),
})
export type MasterFacilityListParams = z.infer<typeof MasterFacilityListParamsSchema>

export const MasterFacilityListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  type: z.string().nullable(),
  is_active: z.boolean(),
})

export type MasterFacilityListItem = z.infer<typeof MasterFacilityListItemSchema>

export const MasterFacilityListResponseSchema = httpGetListResponseSchemaBuilder(MasterFacilityListItemSchema)
export type MasterFacilityListResponse = z.infer<typeof MasterFacilityListResponseSchema>

export const getList = async <ResponseType = MasterFacilityListResponse>({
  params,
  options,
}: {
  params: MasterFacilityListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/facilities',
  })
  return response?.data
}
