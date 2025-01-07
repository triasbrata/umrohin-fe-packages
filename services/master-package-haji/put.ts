import { HttpBaseResponseMetaSchema, httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const PackageHajiUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type PackageHajiUpdateItemParams = z.infer<typeof PackageHajiUpdateItemParamsSchema>

export const PackageHajiUpdateItemBodySchema = z.object({
  name: z.string(),
  is_furoda: z.boolean(),
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
export type PackageHajiUpdateItemBody = z.infer<typeof PackageHajiUpdateItemBodySchema>

export const PackageHajiUpdateItemResultSchema = z.object({
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
export type PackageHajiUpdateItemResult = z.infer<typeof PackageHajiUpdateItemResultSchema>

export const PackageHajiUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(PackageHajiUpdateItemResultSchema)
export type PackageHajiUpdateItemResponse = z.infer<typeof PackageHajiUpdateItemResponseSchema>

export const updateItem = async <ResponseType = PackageHajiUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: PackageHajiUpdateItemParams
  body: PackageHajiUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params

  const formData = new FormData()

  Object.entries(body).forEach(([key, value]) => {
    if (!value) return
    if (key === 'image') {
      ;(value as File[]).forEach((file) => {
        formData.append(key, file)
      })
    } else if (key === 'flights') {
      value.forEach((val: Record<string, any>, i: number) => {
        Object.entries(val).forEach(([key2, value2]) => {
          if (!value2) return
          formData.append(`flights[${i}][${key2}]`, value2 as string)
        })
      })
    } else if (Array.isArray(value)) {
      value.map((val) => formData.append(`${key}[]`, val))
    } else {
      formData.append(key, value)
    }
  })

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'put',
    url: `/v1/products_haji/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

// ACTIVATION TOKOH
export const MasterPackageHajiItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterPackageHajiItemParams = z.infer<typeof MasterPackageHajiItemParamsSchema>

export const MasterPackageHajiItemBodySchema = zfd.formData({ status: z.string() })
export type MasterPackageHajiItemBody = z.infer<typeof MasterPackageHajiItemBodySchema>

export const MasterPackageHajiItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterPackageHajiItemResponse = z.infer<typeof MasterPackageHajiItemResponseSchema>

export const activateItem = async <ResponseType = MasterPackageHajiItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterPackageHajiItemParams
  body: MasterPackageHajiItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/products_haji/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
