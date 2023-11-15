import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/city`

export const DummyMasterCityListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
  province: z.string(),
  icon_url: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
})

export type DummyMasterCityListItem = z.infer<typeof DummyMasterCityListItemSchema>

export const MasterCityListParamsSchema = z.object({
  page: z.number().optional(),
  page_size: z.number().optional(),
  name: z.string().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type MasterCityListParams = z.infer<typeof MasterCityListParamsSchema>

export const MasterCityListItemSchema = z.object({
  city_id: z.string(),
  city_name: z.string(),
  country_name: z.string(),
  country_code: z.string(),
  province: z.string(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MasterCityListItem = z.infer<typeof MasterCityListItemSchema>

export const MasterCityListResponseSchema = httpGetListResponseSchemaBuilder(MasterCityListItemSchema)

export type MasterCityListResponse = z.infer<typeof MasterCityListResponseSchema>

export const getList = async <ResponseType = MasterCityListResponse>({
  params,
  options,
}: {
  params: MasterCityListParams
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
