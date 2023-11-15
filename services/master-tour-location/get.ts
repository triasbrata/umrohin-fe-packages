import { common } from '@apps/split/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetListResponseSchemaBuilder } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/tour-location`

export const MasterTourLocationListParamsSchema = z.object({
  name: z.string().optional(),
  page: z.number().optional(),
  page_size: z.number().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type MasterTourLocationListParams = z.infer<typeof MasterTourLocationListParamsSchema>

export const MasterTourLocationListItemSchema = z.object({
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

export type MasterTourLocationListItem = z.infer<typeof MasterTourLocationListItemSchema>

export const MasterTourLocationListResponseSchema = httpGetListResponseSchemaBuilder(MasterTourLocationListItemSchema)

export type MasterTourLocationListResponse = z.infer<typeof MasterTourLocationListResponseSchema>

export const getList = async <ResponseType = MasterTourLocationListResponse>({
  params,
  options,
}: {
  params: MasterTourLocationListParams
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
