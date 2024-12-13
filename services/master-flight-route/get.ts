import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterFlightRouteListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  export_data: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  is_active: z.boolean().optional(),
  sort_by: z.string().optional(),
  order_by: z.string().optional(),
})
export type MasterFlightRouteListParams = z.infer<typeof MasterFlightRouteListParamsSchema>

export const MasterFlightRouteListItemSchema = z.object({
  id: z.string(),
  from_city_id: z.string(),
  to_city_id: z.string(),
  from_airport_id: z.string(),
  to_airport_id: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  city_from: z.object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
  city_to: z.object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
  airport_from: z.object({
    id: z.string(),
    country_id: z.string(),
    city_id: z.string().nullable(),
    code: z.string(),
    city_name: z.string(),
    area_code: z.string(),
    timezone: z.string(),
    international_name: z.string(),
    airport_code: z.string(),
    local_name: z.string(),
    local_city: z.string().nullable(),
    country_code: z.string(),
    country_vendor_id: z.string(),
    is_active: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
  airport_to: z.object({
    id: z.string(),
    country_id: z.string(),
    city_id: z.string().nullable(),
    code: z.string(),
    city_name: z.string(),
    area_code: z.string(),
    timezone: z.string(),
    international_name: z.string(),
    airport_code: z.string(),
    local_name: z.string(),
    local_city: z.string().nullable(),
    country_code: z.string(),
    country_vendor_id: z.string(),
    is_active: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
})

export type MasterFlightRouteListItem = z.infer<typeof MasterFlightRouteListItemSchema>

export const MasterFlightRouteListResponseSchema = httpGetListResponseSchemaBuilder(MasterFlightRouteListItemSchema)
export type MasterFlightRouteListResponse = z.infer<typeof MasterFlightRouteListResponseSchema>

export const getList = async <ResponseType = MasterFlightRouteListResponse>({
  params,
  options,
}: {
  params: MasterFlightRouteListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/flights_route',
  })
  return response?.data
}
