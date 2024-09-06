import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterCityFlightListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  sort_by: z.string().optional(),
  order_by: z.string().optional(),
  export_data: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
})
export type MasterCityFlightListParams = z.infer<typeof MasterCityFlightListParamsSchema>

export const MasterCityFlightListItemSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
})
export type MasterCityFlightListItem = z.infer<typeof MasterCityFlightListItemSchema>

export const MasterCityFlightListResponseSchema = httpGetListResponseSchemaBuilder(MasterCityFlightListItemSchema)
export type MasterCityFlightListResponse = z.infer<typeof MasterCityFlightListResponseSchema>

export const getList = async <ResponseType = MasterCityFlightListResponse>({
  params,
  options,
}: {
  params: MasterCityFlightListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/cities_flight',
  })
  return response?.data
}
