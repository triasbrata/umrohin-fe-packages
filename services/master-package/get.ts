import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterPackageListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type MasterPackageListParams = z.infer<typeof MasterPackageListParamsSchema>

export const MasterPackageListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  day: z.string(),
  night: z.string(),
  hotel_name: z.string(),
  bedroom: z.string(),
  short_description: z.string(),
  description: z.string(),
  airport_departure: z.string(),
  date_departure: z.string(),
  date_arrived: z.string(),
  capacity: z.string(),
  price: z.string(),
  discount: z.string(),
  discount_price: z.string(),
  status: z.string(),
  featured_image: z.string(),
  image: z.string(),
  facilities: z.string().array(),
  leaders: z.string().array(),
  partner_id: z.string(),
  hotels: z.string().array(),
  flights: z.array(
    z.object({
      airline_id: z.string(),
      airport_from_id: z.string(),
      airport_to_id: z.string(),
      from_city_id: z.string(),
      to_city_id: z.string(),
      flight_time: z.string(),
    })
  ),
  highlight: z.boolean(),
  price_quad: z.string(),
  price_double: z.string(),
  price_triple: z.string(),
  object_wisata: z.string().array(),
  tema_id: z.string(),
})
export type MasterPackageListItem = z.infer<typeof MasterPackageListItemSchema>

export const MasterPackageListResponseSchema = httpGetListResponseSchemaBuilder(MasterPackageListItemSchema)
export type MasterPackageListResponse = z.infer<typeof MasterPackageListResponseSchema>

export const getList = async <ResponseType = MasterPackageListResponse>({
  params,
  options,
}: {
  params: MasterPackageListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/products',
  })
  return response?.data
}
