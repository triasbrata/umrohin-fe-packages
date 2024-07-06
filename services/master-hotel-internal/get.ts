import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterHotelInternalListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type MasterHotelInternalListParams = z.infer<typeof MasterHotelInternalListParamsSchema>

export const MasterHotelInternalListItemSchema = z.object({
  id: z.string(),
  featured_image: z.string(),
  hotel_name: z.string(),
  short_description: z.string(),
  stars: z.string(),
  distance_meter: z.string(),
  distance_from: z.string(),
})
export type MasterHotelInternalListItem = z.infer<typeof MasterHotelInternalListItemSchema>

export const MasterHotelInternalListResponseSchema = httpGetListResponseSchemaBuilder(MasterHotelInternalListItemSchema)
export type MasterHotelInternalListResponse = z.infer<typeof MasterHotelInternalListResponseSchema>

export const getList = async <ResponseType = MasterHotelInternalListResponse>({
  params,
  options,
}: {
  params: MasterHotelInternalListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/hotel_internal',
  })
  return response?.data
}
