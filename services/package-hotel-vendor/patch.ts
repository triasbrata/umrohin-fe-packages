import { HttpBaseResponseMetaSchema, httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const PackageHotelVendorUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type PackageHotelVendorUpdateItemParams = z.infer<typeof PackageHotelVendorUpdateItemParamsSchema>

export const PackageHotelVendorUpdateItemBodySchema = zfd.formData({
  provider_id: zfd.text(),
  name: zfd.text(),
  city_id: zfd.text(),
  stars: zfd.text(),
  address: zfd.text(),

  start_date: zfd.text(),
  end_date: zfd.text(),
  // date_period: zfd.text().optional(),
  date_period: z.array(z.string()).optional(),

  featured_image: z.union([zfd.file(), z.string()]),
  facilities: zfd.text(),

  rooms: z
    .object({
      name: zfd.text(),
      quota: zfd.text().optional(),
      is_unlimited: z.boolean(),
      price: zfd.text().optional(),
    })
    .array(),
  quad_price: z.number().optional(),
  quad_quota: z.number().optional(),
  tripple_price: z.number().optional(),
  tripple_quota: z.number().optional(),
  double_price: z.number().optional(),
  double_quota: z.number().optional(),
})
export type PackageHotelVendorUpdateItemBody = z.infer<typeof PackageHotelVendorUpdateItemBodySchema>

export const PackageHotelVendorUpdateItemResultSchema = z.object({
  id: z.string(),
  provider_id: z.string(),
  name: z.string(),
  city_id: z.string(),
  stars: z.string(),
  address: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  featured_image: z.string(),
  images: z.string().array(),
  facilities: z.string().array(),
  rooms: z
    .object({
      name: zfd.text(),
      quota: zfd.text().optional(),
      is_unlimited: z.boolean(),
      price: zfd.text().optional(),
    })
    .array(),
})
export type PackageHotelVendorUpdateItemResult = z.infer<typeof PackageHotelVendorUpdateItemResultSchema>

export const PackageHotelVendorUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  PackageHotelVendorUpdateItemResultSchema
)
export type PackageHotelVendorUpdateItemResponse = z.infer<typeof PackageHotelVendorUpdateItemResponseSchema>

export const updateItem = async <ResponseType = PackageHotelVendorUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: PackageHotelVendorUpdateItemParams
  body: PackageHotelVendorUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/hotel_vendor/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

// Activation
export const PackageHotelVendorActivationItemParamsSchema = z.object({ id: z.string().optional() })
export type PackageHotelVendorActivationItemParams = z.infer<typeof PackageHotelVendorActivationItemParamsSchema>

export const PackageHotelVendorActivationItemBodySchema = zfd.formData({ is_active: z.boolean() })
export type PackageHotelVendorActivationItemBody = z.infer<typeof PackageHotelVendorActivationItemBodySchema>

export const PackageHotelVendorActivationItemResponseSchema = HttpBaseResponseMetaSchema
export type PackageHotelVendorActivationItemResponse = z.infer<typeof PackageHotelVendorActivationItemResponseSchema>

export const activateItem = async <ResponseType = PackageHotelVendorActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: PackageHotelVendorActivationItemParams
  body: PackageHotelVendorActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/actions_up/hotel_vendor/${id}`,
  })
  return response?.data
}
