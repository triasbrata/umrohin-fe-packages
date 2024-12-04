import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterPackageHajiListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
})
export type MasterPackageHajiListParams = z.infer<typeof MasterPackageHajiListParamsSchema>

export const MasterPackageHajiListItemSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  is_furoda: z.boolean().nullable(),
  day: z.string().nullable(),
  night: z.string().nullable(),
  hotel_name: z.string().nullable(),
  bedroom: z.string().nullable(),
  short_description: z.string().nullable(),
  description: z.string().nullable(),
  airport_departure: z.string().nullable(),
  date_departure: z.any(),
  date_arrived: z.any(),
  capacity: z.string().nullable(),
  price: z.string().nullable(),
  discount: z.string().nullable(),
  discount_price: z.string().nullable(),
  status: z.string().nullable(),
  featured_image: z.any(),
  image: z.any().nullable(),
  images: z.any().nullable(),
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
          short_description: z.string().nullish(),
          stars: z.number(),
          distance_meter: z.number().nullish(),
          distance_from: z.string().nullish(),
        })
        .nullable()
    )
    .default([])
    .nullable(),
  hotel_transit: z
    .array(
      z
        .object({
          id: z.string(),
          featured_image: z.string().nullish(),
          hotel_name: z.string(),
          short_description: z.string(),
          stars: z.number(),
          distance_meter: z.number().nullish(),
          distance_from: z.string().nullish(),
        })
        .nullable()
    )
    .default([])
    .nullable()
    .nullish(),
  flights: z
    .array(
      z
        .object({
          airline_id: z.string(),
          airport_from_id: z.string().nullable(),
          airport_to_id: z.string().nullable(),
          from_city_id: z.string().nullable(),
          to_city_id: z.string().nullable(),
          flight_time: z.string().nullable(),
          bagage_capacity: z.number().optional().nullable(),
          bagage_cabin: z.number().optional().nullable(),
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
  tema: z
    .object({
      id: z.string(),
      name: z.string(),
      image: z.string(),
      description: z.string().nullable(),
      is_active: z.boolean(),
      created_at: z.string(),
      updated_at: z.string(),
      is_deleted: z.boolean(),
    })
    .nullable(),
  partner: z
    .object({
      id: z.string(),
      name: z.string(),
      director_name: z.string().nullable(),
      phone: z.string(),
      sk_number: z.string().nullable(),
      sk_year: z.number().nullable(),
      office_status: z.string().nullable(),
      office_address: z.string().nullable(),
      logo: z.string().nullable(),
      banner: z.string().nullable(),
      bank_name: z.string().nullable(),
      account_name: z.string().nullable(),
      account_number: z.string().nullable(),
      status: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
      ppiu_number: z.string().nullable(),
      pihk_number: z.string().nullable(),
      verification_status: z.string().nullable(),
      reason: z.string().nullable(),
      is_deleted: z.boolean(),
    })
    .nullable(),
})

export type MasterPackageHajiListItem = z.infer<typeof MasterPackageHajiListItemSchema>

export const MasterPackageHajiListResponseSchema = httpGetListResponseSchemaBuilder(MasterPackageHajiListItemSchema)

export type MasterPackageHajiListResponse = z.infer<typeof MasterPackageHajiListResponseSchema>

export const getList = async <ResponseType = MasterPackageHajiListResponse>({
  params,
  options,
}: {
  params: MasterPackageHajiListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/products_haji',
  })
  return response?.data
}
