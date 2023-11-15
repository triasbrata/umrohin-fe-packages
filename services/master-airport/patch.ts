import { common } from '@apps/split/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/airport`

export const MasterAirportUpdateItemParamsSchema = z.object({ id: z.number() })

export type MasterAirportUpdateItemParams = z.infer<typeof MasterAirportUpdateItemParamsSchema>

export const MasterAirportUpdateItemBodySchema = z.object({
  name: z.string(),
  code: z.string(),
  city_id: z.number(),
})

export type MasterAirportUpdateItemBody = z.infer<typeof MasterAirportUpdateItemBodySchema>

export const MasterAirportUpdateItemResultSchema = z.object({
  airport_id: z.string(),
  city_id: z.string(),
  name: z.string(),
  code: z.string(),
  created_by: z.string(),
  created_at: z.string(),
  updated_by: z.string().nullable(),
  updated_at: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
})

export type MasterAirportUpdateItemResult = z.infer<typeof MasterAirportUpdateItemResultSchema>

export const MasterAirportUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterAirportUpdateItemResultSchema
)

export type MasterAirportUpdateItemResponse = z.infer<typeof MasterAirportUpdateItemResponseSchema>

export const updateItem = async <ResponseType = MasterAirportUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterAirportUpdateItemParams
  body: MasterAirportUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'patch',
    url: `${endpointUrl}/${id}`,
  })
  return response?.data
}

export const MasterAirportActivationItemParamsSchema = z.object({ id: z.number() })

export type MasterAirportActivationItemParams = z.infer<typeof MasterAirportActivationItemParamsSchema>

export const MasterAirportActivationItemBodySchema = z.object({
  status: z.union([z.literal(0), z.literal(1)]),
})

export type MasterAirportActivationItemBody = z.infer<typeof MasterAirportActivationItemBodySchema>

export const MasterAirportActivationItemResultSchema = z.object({
  airport_id: z.string(),
  city_id: z.string(),
  name: z.string(),
  code: z.string(),
  created_by: z.string(),
  created_at: z.string(),
  updated_by: z.string().nullable(),
  updated_at: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
})

export type MasterAirportActivationItemResult = z.infer<typeof MasterAirportActivationItemResultSchema>

export const MasterAirportActivationItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterAirportActivationItemResultSchema
)

export type MasterAirportActivationItemResponse = z.infer<typeof MasterAirportActivationItemResponseSchema>

export const activationItem = async <ResponseType = MasterAirportActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterAirportActivationItemParams
  body: MasterAirportActivationItemBody
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
