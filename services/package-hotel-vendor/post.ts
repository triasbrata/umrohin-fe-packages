import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const PackageHotelVendorCreateItemBodySchema = zfd.formData({
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
  // image: z.union([zfd.file(), z.string()]),
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
export type PackageHotelVendorCreateItemBody = z.infer<typeof PackageHotelVendorCreateItemBodySchema>

export const PackageHotelVendorCreateItemResultSchema = z.object({
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
export type PackageHotelVendorCreateItemResult = z.infer<typeof PackageHotelVendorCreateItemResultSchema>

export const PackageHotelVendorCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  PackageHotelVendorCreateItemResultSchema.nullable()
)
export type PackageHotelVendorCreateItemResponse = z.infer<typeof PackageHotelVendorCreateItemResponseSchema>

export const createItem = async <ResponseType = PackageHotelVendorCreateItemResponse>({
  body,
  options,
}: {
  body: PackageHotelVendorCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: '/v1/hotel_vendor',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
