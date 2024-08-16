import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterTourLeaderListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type MasterTourLeaderListParams = z.infer<typeof MasterTourLeaderListParamsSchema>

const ImageSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
})

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  featured_image: z.string().nullable(),
  day: z.string(),
  night: z.string(),
  hotel_name: z.string(),
  bedroom: z.string(),
  short_description: z.string(),
  description: z.string(),
  ittenary: z.string(),
  airport_departure: z.string(),
  date_departure: z.string(),
  date_arrived: z.string(),
  capacity: z.string(),
  price: z.string(),
  discount: z.string(),
  discount_price: z.string().nullable(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  partner_id: z.string(),
  price_quad: z.string().nullable(),
  price_double: z.string().nullable(),
  price_triple: z.string().nullable(),
  discount_quad: z.string().nullable(),
  discount_double: z.string().nullable(),
  discount_triple: z.string().nullable(),
  discount_price_quad: z.string().nullable(),
  discount_price_double: z.string().nullable(),
  discount_price_triple: z.string().nullable(),
  promo_type: z.string(),
  highlight: z.boolean(),
  others_fee: z.string().nullable(),
  tax_percentage: z.string().nullable(),
  tax_price: z.string().nullable(),
  tema_id: z.string().nullable(),
})

export const MasterTourLeaderListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  short_description: z.string(),
  description: z.string().optional(),
  year_experience: z.number().nullable(),
  price: z.string(),
  discount: z.string(),
  status: z.string(),
  featured_image: z.string().nullable(),
  images: z.array(ImageSchema),
  skills: z.array(z.string()),
  languages: z.array(z.string()),
  type: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  products: z.array(ProductSchema),
})

export type MasterTourLeaderListItem = z.infer<typeof MasterTourLeaderListItemSchema>

export const MasterTourLeaderListResponseSchema = httpGetListResponseSchemaBuilder(MasterTourLeaderListItemSchema)
export type MasterTourLeaderListResponse = z.infer<typeof MasterTourLeaderListResponseSchema>

export const getList = async <ResponseType = MasterTourLeaderListResponse>({
  params,
  options,
}: {
  params: MasterTourLeaderListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/leaders',
  })
  return response?.data
}
