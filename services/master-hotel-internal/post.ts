import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const MasterHotelInternalCreateItemBodySchema = zfd.formData({
  featured_image: z.union([zfd.file(), z.string()]),
  hotel_name: zfd.text(),
  short_description: zfd.text(),
  stars: zfd.text(),
  city_flight_select: zfd.text().optional(),
  city_flight_id: zfd.text(),
  image: z.union([zfd.file(), z.string()]).optional(),
  arrounds: zfd
    .json(
      z.array(
        z.object({
          name: z.string(),
          distance: z.union([z.string(), z.number()]),
        })
      )
    )
    .optional(),
})
export type MasterHotelInternalCreateItemBody = z.infer<typeof MasterHotelInternalCreateItemBodySchema>

export const MasterHotelInternalCreateItemResultSchema = z.object({
  featured_image: z.union([zfd.file(), z.string()]),
  hotel_name: zfd.text(),
  short_description: zfd.text(),
  stars: zfd.text(),
  city_flight_select: zfd.text(),
  city_flight_id: zfd.text(),
  image: z.union([zfd.file(), z.string()]).optional(),
  arrounds: z.array(z.object({ name: z.string(), distance: z.string() })).optional(),
})
export type MasterHotelInternalCreateItemResult = z.infer<typeof MasterHotelInternalCreateItemResultSchema>

export const MasterHotelInternalCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterHotelInternalCreateItemResultSchema.nullable()
)
export type MasterHotelInternalCreateItemResponse = z.infer<typeof MasterHotelInternalCreateItemResponseSchema>

export const createItem = async <ResponseType = MasterHotelInternalCreateItemResponse>({
  body,
  options,
}: {
  body: MasterHotelInternalCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, value)
    }
  })

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'post',
    url: '/v1/hotel_internal',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
