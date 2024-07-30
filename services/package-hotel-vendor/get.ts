import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const PackageHotelVendorListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type PackageHotelVendorListParams = z.infer<typeof PackageHotelVendorListParamsSchema>

export const PackageHotelVendorListItemSchema = z.object({
  id: z.string(),
  provider_id: z.string(),
  provider: z.object({
    name: z.string(),
  }),
  name: z.string(),
  city_id: z.string(),
  city: z.object({
    code: z.string(),
    name: z.string(),
  }),
  stars: z.string(),
  address: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  featured_image: z.string(),
  images: z
    .object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
    })
    .array(),
  facilities: z.string().array(),
  rooms: z
    .object({
      name: z.string(),
      quota: z.number(),
      is_unlimited: z.boolean(),
      price: z.number(),
    })
    .array(),
  is_active: z.boolean(),
})
export type PackageHotelVendorListItem = z.infer<typeof PackageHotelVendorListItemSchema>

export const PackageHotelVendorListResponseSchema = httpGetListResponseSchemaBuilder(PackageHotelVendorListItemSchema)
export type PackageHotelVendorListResponse = z.infer<typeof PackageHotelVendorListResponseSchema>

export const getList = async <ResponseType = PackageHotelVendorListResponse>({
  params,
  options,
}: {
  params: PackageHotelVendorListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/hotel_vendor',
  })
  return response?.data
}
