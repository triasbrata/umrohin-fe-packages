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
  name: z.string().nullable(),
  day: z.string().nullable(),
  night: z.string().nullable(),
  hotel_name: z.string().nullable(),
  bedroom: z.string().nullable(),
  short_description: z.string(),
  description: z.string(),
  airport_departure: z.string(),
  date_departure: z.any(),
  date_arrived: z.any(),
  capacity: z.string(),
  price: z.string().nullable(),
  discount: z.string().nullable(),
  discount_price: z.string().nullable(),
  status: z.string().nullable(),
  featured_image: z.any(),
  image: z.any(),
  images: z.any(),
  // images: z
  //   .array(
  //     z
  //       .object({
  //         id: z.string(),
  //         name: z.string(),
  //         url: z.string(),
  //       })
  //       .nullable()
  //   )
  //   .nullable()
  //   .optional(),

  facilities: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        icon: z.string().nullable(),
        type: z.string().nullable(),
      })
    )
    .default([]),
  leaders: z
    .array(
      z
        .object({
          id: z.string().nullable(),
          featured_image: z.string().nullable(),
          name: z.string().nullable(),
          short_description: z.string().nullable(),
          description: z.string().nullable(),
          year_experience: z.number().nullable(),
          price: z.string().nullable(),
          discount: z.string().nullable(),
          status: z.string().nullable(),
          type: z.string().nullable(),
        })
        .nullable()
    )
    .default([])
    .nullable(),
  partner_id: z.string().nullable(),
  hotels: z
    .array(
      z
        .object({
          id: z.string(),
          featured_image: z.string(),
          hotel_name: z.string(),
          short_description: z.string(),
          stars: z.number(),
          distance_meter: z.number(),
          distance_from: z.string(),
        })
        .nullable()
    )
    .default([])
    .nullable(),
  flights: z
    .array(
      z
        .object({
          airline_id: z.string(),
          airport_from_id: z.string(),
          airport_to_id: z.string(),
          from_city_id: z.string(),
          to_city_id: z.string(),
          flight_time: z.string(),
        })
        .nullable()
    )
    .nullable()
    .default([]),
  highlight: z.boolean().nullable(),
  price_quad: z.string().nullable(),
  price_double: z.string().nullable(),
  price_triple: z.string().nullable(),
  discount_quad: z.string().nullable(),
  discount_double: z.string().nullable(),
  discount_triple: z.string().nullable(),
  discount_price_quad: z.string().nullable(),
  discount_price_double: z.string().nullable(),
  discount_price_triple: z.string().nullable(),
  object_wisata: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        image: z.string(),
        description: z.string(),
        is_active: z.boolean(),
      })
    )
    .nullable()
    .default([]),
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
