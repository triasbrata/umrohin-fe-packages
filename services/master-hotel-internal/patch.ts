import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const MasterHotelInternalUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterHotelInternalUpdateItemParams = z.infer<typeof MasterHotelInternalUpdateItemParamsSchema>

export const MasterHotelInternalUpdateItemBodySchema = zfd.formData({
  featured_image: z.union([zfd.file(), z.string()]),
  hotel_name: zfd.text(),
  short_description: zfd.text(),
  stars: zfd.text(),
  distance_meter: zfd.text(),
  distance_from: zfd.text(),
})
export type MasterHotelInternalUpdateItemBody = z.infer<typeof MasterHotelInternalUpdateItemBodySchema>

export const MasterHotelInternalUpdateItemResultSchema = z.object({
  id: z.string(),
  featured_image: z.string(),
  hotel_name: z.string(),
  short_description: z.string(),
  stars: z.string(),
  distance_meter: z.string(),
  distance_from: z.string(),
})
export type MasterHotelInternalUpdateItemResult = z.infer<typeof MasterHotelInternalUpdateItemResultSchema>

export const MasterHotelInternalUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterHotelInternalUpdateItemResultSchema
)
export type MasterHotelInternalUpdateItemResponse = z.infer<typeof MasterHotelInternalUpdateItemResponseSchema>

export const updateItem = async <ResponseType = MasterHotelInternalUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterHotelInternalUpdateItemParams
  body: MasterHotelInternalUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'put',
    url: `/v1/hotel_internal/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
