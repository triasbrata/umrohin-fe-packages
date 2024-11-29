import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterHotelInternalListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
})
export type MasterHotelInternalListParams = z.infer<typeof MasterHotelInternalListParamsSchema>

export const MasterHotelInternalListItemSchema = z.object({
  id: z.string(),
  featured_image: z.string(),
  hotel_name: z.string(),
  short_description: z.string(),
  stars: z.any(),
  image: z.any().optional(),
  city_flight_id: z.string(),
  city_flight: z.object({
    name: z.string(),
  }),
  arrounds: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        distance: z.number(),
      })
    )
    .optional(),
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
