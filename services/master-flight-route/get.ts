import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterFlightRouteListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type MasterFlightRouteListParams = z.infer<typeof MasterFlightRouteListParamsSchema>

export const MasterFlightRouteListItemSchema = z.object({
  id: z.string(),
  from_airport_id: z.string(),
  to_airport_id: z.string(),
  airport_from: z.object({
    code: z.string(),
    city_name: z.string(),
  }),
  airport_to: z.object({
    code: z.string(),
    city_name: z.string(),
  }),
  city_from: z.object({
    code: z.string(),
    name: z.string(),
  }),
  city_to: z.object({
    code: z.string(),
    name: z.string(),
  }),
  is_active: z.boolean(),
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
