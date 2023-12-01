import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/hotel`

export const HotelUpdateItemParamsSchema = z.object({ id: z.number() })

export type HotelUpdateItemParams = z.infer<typeof HotelUpdateItemParamsSchema>

export const HotelUpdateItemBodySchema = zfd.formData({
  image: z.union([zfd.file(), z.string()]),
  name: z.string(),
  city_id: z.string(),
  distance_to_haram: z.number(),
  distance_to_nabawi: z.number(),
  star: z.number(),
})

export type HotelUpdateItemBody = z.infer<typeof HotelUpdateItemBodySchema>

export const HotelUpdateItemResultSchema = z.object({
  accommodation_id: z.string(),
  name: z.string(),
  city_id: z.string(),
  city_name: z.string(),
  distance_to_haram: z.number(),
  distance_to_nabawi: z.number(),
  star: z.number(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
})

export type HotelUpdateItemResult = z.infer<typeof HotelUpdateItemResultSchema>

export const HotelUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(HotelUpdateItemResultSchema)

export type HotelUpdateItemResponse = z.infer<typeof HotelUpdateItemResponseSchema>

export const updateItem = async <ResponseType = HotelUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: HotelUpdateItemParams
  body: HotelUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
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
    method: 'patch',
    url: `${endpointUrl}/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

export const HotelActivationItemParamsSchema = z.object({ id: z.number() })

export type HotelActivationItemParams = z.infer<typeof HotelActivationItemParamsSchema>

export const HotelActivationItemBodySchema = z.object({
  status: z.union([z.literal(0), z.literal(1)]),
})

export type HotelActivationItemBody = z.infer<typeof HotelActivationItemBodySchema>

export const HotelActivationItemResultSchema = z.object({
  accommodation_id: z.string(),
  name: z.string(),
  city_id: z.string(),
  city_name: z.string(),
  distance_to_haram: z.number(),
  distance_to_nabawi: z.number(),
  star: z.number(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
})

export type HotelActivationItemResult = z.infer<typeof HotelActivationItemResultSchema>

export const HotelActivationItemResponseSchema = httpGetDetailResponseSchemaBuilder(HotelActivationItemResultSchema)

export type HotelActivationItemResponse = z.infer<typeof HotelActivationItemResponseSchema>

export const activationItem = async <ResponseType = HotelActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: HotelActivationItemParams
  body: HotelActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'patch',
    url: `${endpointUrl}/${id}/status`,
  })
  return response?.data
}
