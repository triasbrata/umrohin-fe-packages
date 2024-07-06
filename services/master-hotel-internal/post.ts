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
  distance_meter: zfd.text(),
  distance_from: zfd.text(),
})
export type MasterHotelInternalCreateItemBody = z.infer<typeof MasterHotelInternalCreateItemBodySchema>

export const MasterHotelInternalCreateItemResultSchema = z.object({
  id: z.string(),
  featured_image: z.string(),
  hotel_name: z.string(),
  short_description: z.string(),
  stars: z.string(),
  distance_meter: z.string(),
  distance_from: z.string(),
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
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

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
