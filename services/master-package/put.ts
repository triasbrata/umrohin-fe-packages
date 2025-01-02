import { HttpBaseResponseMetaSchema, httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const PackageUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type PackageUpdateItemParams = z.infer<typeof PackageUpdateItemParamsSchema>

export const PackageUpdateItemBodySchema = z.object({
  name: z.string(),
  day: z.string(),
  night: z.string(),
  hotel_name: z.string(),
  bedroom: z.string().optional().nullable(),
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
  image: z.array(z.any().optional().nullable()).optional().nullable(),
  facilities: z.string().array().optional().nullable(),
  leaders: z.array(z.string()).optional().nullable(),
  partner_id: z.string(),
  hotels: z.array(z.string()),
  hotels_transit: z.array(z.string()).optional(),
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
  object_wisata: z.array(z.string()).optional().nullable(),
  tema_id: z.string().optional().nullable(),
  down_payment: z.number().optional().nullable(),
  dp_expired_date: z.string().optional().nullable(),
  dp_expired_time: z.string().optional().nullable(),
  dp_instruction: z.string().optional().nullable(),
  with_dp: z.boolean(),
})
export type PackageUpdateItemBody = z.infer<typeof PackageUpdateItemBodySchema>

export const PackageUpdateItemResultSchema = z.object({
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
  facilities: z.array(z.string()).optional().nullable(),
  leaders: z.array(z.string()).optional().nullable(),
  partner_id: z.string(),
  hotels: z.array(z.string()).optional().nullable(),
  hotels_transit: z.array(z.string()).optional().nullable(),
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
export type PackageUpdateItemResult = z.infer<typeof PackageUpdateItemResultSchema>

export const PackageUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(PackageUpdateItemResultSchema)
export type PackageUpdateItemResponse = z.infer<typeof PackageUpdateItemResponseSchema>

export const updateItem = async <ResponseType = PackageUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: PackageUpdateItemParams
  body: PackageUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/products/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

// ACTIVATION TOKOH
export const MasterPackageItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterPackageItemParams = z.infer<typeof MasterPackageItemParamsSchema>

export const MasterPackageItemBodySchema = zfd.formData({ status: z.string() })
export type MasterPackageItemBody = z.infer<typeof MasterPackageItemBodySchema>

export const MasterPackageItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterPackageItemResponse = z.infer<typeof MasterPackageItemResponseSchema>

export const activateItem = async <ResponseType = MasterPackageItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterPackageItemParams
  body: MasterPackageItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/products/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
