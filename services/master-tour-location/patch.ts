import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { httpGetDetailResponseSchemaBuilder } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/tour-location`

export const MasterTourLocationUpdateItemParamsSchema = z.object({ id: z.number() })

export type MasterTourLocationUpdateItemParams = z.infer<typeof MasterTourLocationUpdateItemParamsSchema>

export const MasterTourLocationUpdateItemBodySchema = zfd.formData({
  image: z.union([zfd.file(), z.string()]),
  name: zfd.text(),
  main_tour_location: z.boolean(),
  is_highlight: z.boolean(),
  city_id: z.number(),
})

export type MasterTourLocationUpdateItemBody = z.infer<typeof MasterTourLocationUpdateItemBodySchema>

export const MasterTourLocationUpdateItemResultSchema = z.object({
  tour_location_id: z.string(),
  name: z.string(),
  city_id: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
  image: z.string(),
  main_tour_location: z.boolean(),
  is_highlight: z.boolean(),
  city_name: z.string(),
  province: z.string(),
  country_name: z.string(),
})

export type MasterTourLocationUpdateItemResult = z.infer<typeof MasterTourLocationUpdateItemResultSchema>

export const MasterTourLocationUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterTourLocationUpdateItemResultSchema
)

export type MasterTourLocationUpdateItemResponse = z.infer<typeof MasterTourLocationUpdateItemResponseSchema>

export const updateItem = async <ResponseType = MasterTourLocationUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterTourLocationUpdateItemParams
  body: MasterTourLocationUpdateItemBody
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

export const MasterTourLocationActivationItemParamsSchema = z.object({ id: z.number() })

export type MasterTourLocationActivationItemParams = z.infer<typeof MasterTourLocationActivationItemParamsSchema>

export const MasterTourLocationActivationItemBodySchema = z.object({
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MasterTourLocationActivationItemBody = z.infer<typeof MasterTourLocationActivationItemBodySchema>

export const MasterTourLocationActivationItemResultSchema = z.object({
  city_id: z.number(),
  city_name: z.string(),
  country_name: z.string(),
  country_code: z.string(),
  province: z.string(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MasterTourLocationActivationItemResult = z.infer<typeof MasterTourLocationActivationItemResultSchema>

export const MasterTourLocationActivationItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterTourLocationActivationItemResultSchema
)

export type MasterTourLocationActivationItemResponse = z.infer<typeof MasterTourLocationActivationItemResponseSchema>

export const activationItem = async <ResponseType = MasterTourLocationActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterTourLocationActivationItemParams
  body: MasterTourLocationActivationItemBody
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
