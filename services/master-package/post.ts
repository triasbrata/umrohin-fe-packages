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
  airport_departure: zfd.text().optional().nullable(),
  date_departure: z.any(),
  date_arrived: z.any(),
  capacity: zfd.text().optional().nullable(),
  price: zfd.text(),
  discount: zfd.text(),
  discount_price: zfd.text(),
  status: zfd.text(),
  featured_image: zfd.file(),
  image: zfd.file().optional().nullable(),
  facilities: zfd.text().array(),
  leaders: zfd.text().array().optional().nullable(),
  partner_id: zfd.text(),
  hotels: zfd.text().array(),
  flights: z.array(
    z.object({
      urutan: z.string(),
      airline_id: z.string(),
      airport_from_id: z.string().optional().nullable(),
      airport_to_id: z.string().optional().nullable(),
      from_city_id: z.string().optional().nullable(),
      to_city_id: z.string().optional().nullable(),
      flight_time: z.string().optional().nullable(),
    })
  ),
  highlight: zfd.text(),
  price_quad: zfd.text(),
  price_double: zfd.text(),
  price_triple: zfd.text(),
  object_wisata: zfd.text().array().optional().nullable(),
  tema_id: zfd.text().optional().nullable(),
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
  flights: z.array(
    z.object({
      urutan: z.string(),
      airline_id: z.string(),
      airport_from_id: z.string().optional().nullable(),
      airport_to_id: z.string().optional().nullable(),
      from_city_id: z.string().optional().nullable(),
      to_city_id: z.string().optional().nullable(),
      flight_time: z.string().optional().nullable(),
    })
  ),
  highlight: z.boolean(),
  price_quad: z.string(),
  price_double: z.string(),
  price_triple: z.string(),
  object_wisata: z.string().array().optional().nullable(),
  tema_id: z.string().optional().nullable(),
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
