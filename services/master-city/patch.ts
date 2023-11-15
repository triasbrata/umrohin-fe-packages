import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { httpGetDetailResponseSchemaBuilder } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/city`

export const CityUpdateItemParamsSchema = z.object({ id: z.number() })

export type CityUpdateItemParams = z.infer<typeof CityUpdateItemParamsSchema>

export const CityUpdateItemBodySchema = zfd.formData({
  city_name: zfd.text(),
  province: zfd.text(),
  country_name: zfd.text(),
  country_code: zfd.text(),
  image: z.union([zfd.file(), z.string()]),
})

export type CityUpdateItemBody = z.infer<typeof CityUpdateItemBodySchema>

export const CityUpdateItemResultSchema = z.object({
  city_id: z.number(),
  city_name: z.string(),
  country_name: z.string(),
  country_code: z.string(),
  province: z.string(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type CityUpdateItemResult = z.infer<typeof CityUpdateItemResultSchema>

export const CityUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(CityUpdateItemResultSchema)

export type CityUpdateItemResponse = z.infer<typeof CityUpdateItemResponseSchema>

export const updateItem = async <ResponseType = CityUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: CityUpdateItemParams
  body: CityUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))
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

export const CityActivationItemParamsSchema = z.object({ id: z.number() })

export type CityActivationItemParams = z.infer<typeof CityActivationItemParamsSchema>

export const CityActivationItemBodySchema = z.object({
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type CityActivationItemBody = z.infer<typeof CityActivationItemBodySchema>

export const CityActivationItemResultSchema = z.object({
  city_id: z.number(),
  city_name: z.string(),
  country_name: z.string(),
  country_code: z.string(),
  province: z.string(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type CityActivationItemResult = z.infer<typeof CityActivationItemResultSchema>

export const CityActivationItemResponseSchema = httpGetDetailResponseSchemaBuilder(CityActivationItemResultSchema)

export type CityActivationItemResponse = z.infer<typeof CityActivationItemResponseSchema>

export const activationItem = async <ResponseType = CityActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: CityActivationItemParams
  body: CityActivationItemBody
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
