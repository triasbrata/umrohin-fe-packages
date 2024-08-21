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
  hotel_name: z.string().nullable(),
  bedroom: z.string().nullable(),
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
  featured_image: z.string().nullable(),
  images: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
      })
    )
    .nullable()
    .optional(),

  facilities: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        icon: z.string().nullable(),
        created_at: z.string(),
        updated_at: z.string(),
        type: z.string().nullable(),
      })
    )
    .default([]),
  leaders: z.array(z.string()).default([]),
  partner_id: z.string().nullable(),
  hotels: z.array(z.string()).default([]),
  flights: z
    .array(
      z.object({
        airline_id: z.string(),
        airport_from_id: z.string(),
        airport_to_id: z.string(),
        from_city_id: z.string(),
        to_city_id: z.string(),
        flight_time: z.string(),
      })
    )
    .default([]),
  highlight: z.boolean(),
  price_quad: z.string().nullable(),
  price_double: z.string().nullable(),
  price_triple: z.string().nullable(),
  discount_quad: z.string().nullable(),
  discount_double: z.string().nullable(),
  discount_triple: z.string().nullable(),
  discount_price_quad: z.string().nullable(),
  discount_price_double: z.string().nullable(),
  discount_price_triple: z.string().nullable(),
  object_wisata: z.array(z.string()).default([]),
  tema_id: z.string().nullable(),
  others_fee: z.string().nullable(),
  tax_percentage: z.string().nullable(),
  tax_price: z.string().nullable(),
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
