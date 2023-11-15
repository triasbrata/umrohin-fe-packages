import { common } from '@apps/split/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/airport`

export const MasterAirportCreateItemBodySchema = z.object({
  name: z.string(),
  code: z.string(),
  city_id: z.number(),
})

export type MasterAirportCreateItemBody = z.infer<typeof MasterAirportCreateItemBodySchema>

export const MasterAirportCreateItemResultSchema = z.object({
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

export type MasterAirportCreateItemResult = z.infer<typeof MasterAirportCreateItemResultSchema>

export const MasterAirportCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterAirportCreateItemResultSchema
)

export type MasterAirportCreateItemResponse = z.infer<typeof MasterAirportCreateItemResponseSchema>

export const createItem = async <ResponseType = MasterAirportCreateItemResponse>({
  body,
  options,
}: {
  body: MasterAirportCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: endpointUrl,
  })
  return response?.data
}
