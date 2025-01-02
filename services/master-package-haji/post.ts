import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const PackageHajiCreateItemBodySchema = z.object({
  name: z.string(),
  is_furoda: z.boolean(),
  day: z.string(),
  night: z.string(),
  hotel_name: z.string(),
  bedroom: z.string(),
  short_description: z.string(),
  description: z.string(),
  airport_departure: z.string().optional().nullable(),
  date_departure: z.any(),
  date_arrived: z.any(),
  capacity: z.string().optional().nullable(),
  price: z.string(),
  discount: z.string(),
  discount_price: z.string(),
  status: z.string(),
  featured_image: z.any(),
  image: z.array(z.any().optional().nullable()).optional(),
  facilities: z.string().array().optional(),
  leaders: z.string().array().optional().nullable(),
  partner_id: z.string(),
  hotels: z.string().array(),
  hotels_transit: z.string().array(),
  flights: z.array(
    z.object({
      urutan: z.string(),
      airline_id: z.string(),
      airport_from_id: z.string().optional().nullable(),
      airport_to_id: z.string().optional().nullable(),
      from_city_id: z.string().optional().nullable(),
      to_city_id: z.string().optional().nullable(),
      flight_time: z.string().optional().nullable(),
      bagage_capacity: z.number().optional().nullable(),
      bagage_cabin: z.number().optional().nullable(),
    })
  ),
  highlight: z.string(),
  price_quad: z.string(),
  price_double: z.string(),
  price_triple: z.string(),
  object_wisata: z.string().array().optional().nullable(),
  tema_id: z.string().optional().nullable(),
  down_payment: z.number().optional(),
  dp_expired_date: z.any().optional(),
  dp_expired_time: z.any().optional(),
  dp_instruction: z.string().optional(),
  with_dp: z.boolean(),
})
export type PackageHajiCreateItemBody = z.infer<typeof PackageHajiCreateItemBodySchema>

export const PackageHajiCreateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  is_furoda: z.boolean(),
  day: z.string(),
  night: z.string(),
  hotel_name: z.string(),
  bedroom: z.string(),
  short_description: z.string(),
  description: z.string(),
  airport_departure: z.string().optional().nullable(),
  date_departure: z.any(),
  date_arrived: z.any(),
  capacity: z.string().optional().nullable(),
  price: z.string(),
  discount: z.string(),
  discount_price: z.string(),
  status: z.string(),
  featured_image: z.any(),
  image: z.any().optional().nullable(),
  facilities: z.string().array(),
  leaders: z.string().array().optional().nullable(),
  partner_id: z.string(),
  hotels: z.string().array(),
  hotels_transit: z.string().array(),
  flights: z.array(
    z.object({
      urutan: z.string(),
      airline_id: z.string(),
      airport_from_id: z.string().optional().nullable(),
      airport_to_id: z.string().optional().nullable(),
      from_city_id: z.string().optional().nullable(),
      to_city_id: z.string().optional().nullable(),
      flight_time: z.string().optional().nullable(),
      bagage_capacity: z.string().optional().nullable(),
      bagage_cabin: z.string().optional().nullable(),
    })
  ),
  highlight: z.boolean(),
  price_quad: z.string(),
  price_double: z.string(),
  price_triple: z.string(),
  object_wisata: z.string().array().optional().nullable(),
  tema_id: z.string().optional().nullable(),
  down_payment: z.string().nullable(),
  dp_expired_date: z.any().nullable(),
  dp_expired_time: z.any().nullable(),
  dp_instruction: z.string().nullable(),
  with_dp: z.boolean().nullable(),
})
export type PackageHajiCreateItemResult = z.infer<typeof PackageHajiCreateItemResultSchema>

export const PackageHajiCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(PackageHajiCreateItemResultSchema)
export type PackageHajiCreateItemResponse = z.infer<typeof PackageHajiCreateItemResponseSchema>

export const createItem = async <ResponseType = PackageHajiCreateItemResponse>({
  body,
  options,
}: {
  body: PackageHajiCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: '/v1/products_haji',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
