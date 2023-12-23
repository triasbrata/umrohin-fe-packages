import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/hotel`

export const MasterHotelListParamsSchema = z.object({
  name: z.string().optional(),
  page: z.number().optional(),
  page_size: z.number().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type MasterHotelListParams = z.infer<typeof MasterHotelListParamsSchema>

export const MasterHotelListItemSchema = z.object({
  accommodation_id: z.string(),
  name: z.string(),
  city_id: z.string(),
  city_name: z.string(),
  distance_to_haram: z.number(),
  distance_to_nabawi: z.number(),
  star: z.number(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MasterHotelListItem = z.infer<typeof MasterHotelListItemSchema>

export const MasterHotelListResponseSchema = httpGetListResponseSchemaBuilder(MasterHotelListItemSchema)

export type MasterHotelListResponse = z.infer<typeof MasterHotelListResponseSchema>

export const getList = async <ResponseType = MasterHotelListResponse>({
  params,
  options,
}: {
  params: MasterHotelListParams
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
