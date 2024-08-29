import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const PackageCreateItemBodySchema = zfd.formData({
  name: zfd.text(),
  day: zfd.text(),
  night: zfd.text(),
  hotel_name: zfd.text(),
  bedroom: zfd.text(),
  short_description: zfd.text(),
  description: zfd.text(),
  airport_departure: zfd.text(),
  date_departure: z.any(),
  date_arrived: z.any(),
  capacity: zfd.text(),
  price: zfd.text(),
  discount: zfd.text(),
  discount_price: zfd.text(),
  status: zfd.text(),
  featured_image: zfd.file(),
  image: zfd.file(),
  facilities: zfd.text().array(),
  leaders: zfd.text().array(),
  partner_id: zfd.text(),
  hotels: zfd.text().array(),
  flights: z.array(
    z.object({
      urutan: z.string(),
      airline_id: z.string(),
      airport_from_id: z.string(),
      airport_to_id: z.string(),
      from_city_id: z.string(),
      to_city_id: z.string(),
      flight_time: z.string(),
    })
  ),
  highlight: zfd.text(),
  price_quad: zfd.text(),
  price_double: zfd.text(),
  price_triple: zfd.text(),
  object_wisata: zfd.text().array(),
  tema_id: zfd.text(),
})
export type PackageCreateItemBody = z.infer<typeof PackageCreateItemBodySchema>

export const PackageCreateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  day: z.string(),
  night: z.string(),
  hotel_name: z.string(),
  bedroom: z.string(),
  short_description: z.string(),
  description: z.string(),
  airport_departure: z.string(),
  date_departure: z.any(),
  date_arrived: z.any(),
  capacity: z.string(),
  price: z.string(),
  discount: z.string(),
  discount_price: z.string(),
  status: z.string(),
  featured_image: z.any(),
  image: z.any(),
  facilities: z.string().array(),
  leaders: z.string().array(),
  partner_id: z.string(),
  hotels: z.string().array(),
  flights: z.array(
    z.object({
      urutan: z.string(),
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
export type PackageCreateItemResult = z.infer<typeof PackageCreateItemResultSchema>

export const PackageCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(PackageCreateItemResultSchema)
export type PackageCreateItemResponse = z.infer<typeof PackageCreateItemResponseSchema>

export const createItem = async <ResponseType = PackageCreateItemResponse>({
  body,
  options,
}: {
  body: PackageCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: '/v1/products',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
