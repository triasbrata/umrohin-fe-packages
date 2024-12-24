import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const CustomerOrderListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
})
export type CustomerOrderListParams = z.infer<typeof CustomerOrderListParamsSchema>

export const CustomerOrderListItemSchema = z.object({
  id: z.string(),
  from_airport_id: z.string(),
  to_airport_id: z.string(),
  airline_id: z.string(),
  no: z.string(),
  prefix: z.string(),
  ref_no: z.string(),
  channel_id: z.string(),
  currency_id: z.string(),
  total: z.number(),
  discount: z.number(),
  tax_percentage: z.number(),
  tax_price: z.number(),
  fee: z.string(),
  others: z.string(),
  grand_total: z.number(),
  payment_token: z.string(),
  payment_id: z.string(),
  payment_expired: z.string(),
  payment_status: z.string(),
  payment_time: z.string(),
  fraud_status: z.string(),
  transaction_status: z.string(),
  payment_vendor: z.string(),
  note: z.string(),
  from_name: z.string(),
  to_name: z.string(),
  airline_code: z.string(),
  airline_name: z.string(),
  hotel_name: z.string(),
  vehicle_name: z.string(),
  vehicle_no: z.string(),
  journey_type: z.string(),
  type: z.string(),
  status_id: z.string(),
  user: z.any(),
  user_id: z.string(),
  product_id: z.string(),
  members: z.any(),
  items: z.any(),
  discount_price: z.string(),
  pp_from: z
    .object({
      airport_from: z
        .object({
          code: z.string(),
        })
        .nullable(),
    })
    .nullable(),

  pp_to: z
    .object({
      airport_to: z
        .object({
          code: z.string(),
        })
        .nullable(),
    })
    .nullable(),
  created_at: z.any().nullable(),
})
export type CustomerOrderListItem = z.infer<typeof CustomerOrderListItemSchema>

export const CustomerOrderListResponseSchema = httpGetListResponseSchemaBuilder(CustomerOrderListItemSchema)
export type CustomerOrderListResponse = z.infer<typeof CustomerOrderListResponseSchema>

export const getList = async <ResponseType = CustomerOrderListResponse>({
  params,
  options,
}: {
  params: CustomerOrderListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/orders',
  })
  return response?.data
}
