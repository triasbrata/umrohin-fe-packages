import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterHotelInternalListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  export_data: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  is_default: z.boolean().optional(),
  is_nondefault: z.boolean().optional(),
  sort_by: z.string().optional(),
  order_by: z.string().optional(),
})
export type MasterHotelInternalListParams = z.infer<typeof MasterHotelInternalListParamsSchema>

export const MasterHotelInternalListItemSchema = z.object({
  id: z.string(),
  featured_image: z.string().nullable(),
  hotel_name: z.string().nullable(),
  short_description: z.string().nullable(),
  stars: z.any().nullable(),
  image: z.array(z.any()).nullable(),
  city_flight_id: z.string().nullable(),
  city_flight: z
    .object({
      name: z.string().nullable(),
    })
    .nullable(),
  arrounds: z
    .array(
      z.object({
        id: z.string().nullable(),
        name: z.string().nullable(),
        distance: z.number().nullable(),
      })
    )
    .nullable(),
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
