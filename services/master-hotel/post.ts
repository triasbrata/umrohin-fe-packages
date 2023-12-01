import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/hotel`

export const HotelCreateItemBodySchema = zfd.formData({
  image: zfd.file(),
  name: z.string(),
  city_id: z.string(),
  distance_to_haram: z.number(),
  distance_to_nabawi: z.number(),
  star: z.number(),
})

export type HotelCreateItemBody = z.infer<typeof HotelCreateItemBodySchema>

export const HotelCreateItemResultSchema = z.object({
  image: z.union([zfd.file(), z.string()]),
  accommodation_id: z.string(),
  name: z.string(),
  city_id: z.string(),
  city_name: z.string(),
  distance_to_haram: z.number(),
  distance_to_nabawi: z.number(),
  star: z.number(),
  status: z.union([z.literal(0), z.literal(1)]),
})

export type HotelCreateItemResult = z.infer<typeof HotelCreateItemResultSchema>

export const HotelCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(HotelCreateItemResultSchema)

export type HotelCreateItemResponse = z.infer<typeof HotelCreateItemResponseSchema>

export const createItem = async <ResponseType = HotelCreateItemResponse>({
  body,
  options,
}: {
  body: HotelCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    if (typeof value === 'number' || typeof value === 'boolean') {
      formData.append(key, value.toString())
    } else {
      formData.append(key, value)
    }
  })

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'post',
    url: endpointUrl,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
