import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetListResponseSchemaBuilder } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/airport`

export const MasterAirportListParamsSchema = z.object({
  page: z.number().optional(),
  page_size: z.number().optional(),
  name: z.string().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type MasterAirportListParams = z.infer<typeof MasterAirportListParamsSchema>

export const MasterAirportListItemSchema = z.object({
  airport_id: z.string(),
  city_id: z.string(),
  city: z
    .object({
      city_id: z.string(),
      city_name: z.string(),
    })
    .nullable()
    .optional(),
  name: z.string(),
  code: z.string(),
  created_by: z.string(),
  created_at: z.string(),
  updated_by: z.string().nullable(),
  updated_at: z.string().nullable(),
  status: z.union([z.literal(0), z.literal(1)]),
})

export type MasterAirportListItem = z.infer<typeof MasterAirportListItemSchema>

export const MasterAirportListResponseSchema = httpGetListResponseSchemaBuilder(MasterAirportListItemSchema)

export type MasterAirportListResponse = z.infer<typeof MasterAirportListResponseSchema>

export const getList = async <ResponseType = MasterAirportListResponse>({
  params,
  options,
}: {
  params: MasterAirportListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: endpointUrl,
  })
  return response?.data
}
