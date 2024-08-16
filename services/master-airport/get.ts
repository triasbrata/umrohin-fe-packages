import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterAirportListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type MasterAirportListParams = z.infer<typeof MasterAirportListParamsSchema>

export const MasterAirportListItemSchema = z.object({
  id: z.string(),
  country_id: z.string().nullable(),
  city_id: z.string().nullable(),
  code: z.string(),
  city_name: z.string(),
  area_code: z.string(),
  timezone: z.string(),
  international_name: z.string(),
  airport_code: z.string().nullable(),
  local_name: z.string(),
  local_city: z.string().nullable(),
  country_code: z.string(),
  country_vendor_id: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type MasterAirportListItem = z.infer<typeof MasterAirportListItemSchema>

export const MasterAirportListResponseSchema = httpGetListResponseSchemaBuilder(MasterAirportListItemSchema)
export type MasterAirportListResponse = z.infer<typeof MasterAirportListResponseSchema>

export const getList = async <ResponseType = MasterAirportListResponse>({
  params,
  options,
}: {
  params: MasterAirportListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/airports',
  })
  return response?.data
}
