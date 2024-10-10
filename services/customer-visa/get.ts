import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const CustomerVisaListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
})
export type CustomerVisaListParams = z.infer<typeof CustomerVisaListParamsSchema>

export const CustomerVisaListItemSchema = z.object({
  id: z.string(),
  from_airport_id: z.string().nullable(),
  to_airport_id: z.string().nullable(),
  airline_id: z.string().nullable(),
  no: z.string().nullable(),
  prefix: z.string().nullable(),
  ref_no: z.string().nullable(),
  channel_id: z.string().nullable(),
  currency_id: z.string().nullable(),
  total: z.number().nullable(),
  discount: z.number().nullable(),
  tax_percentage: z.number().nullable(),
  tax_price: z.number().nullable(),
  fee: z.string().nullable(),
  others: z.string().nullable(),
  grand_total: z.number().nullable(),
  payment_token: z.string().nullable(),
  payment_id: z.string().nullable(),
  payment_expired: z.string().nullable(),
  payment_status: z.string().nullable(),
  payment_time: z.string().nullable(),
  fraud_status: z.string().nullable(),
  transaction_status: z.string().nullable(),
  payment_vendor: z.string().nullable(),
  note: z.string().nullable(),
  from_name: z.string().nullable(),
  to_name: z.string().nullable(),
  airline_code: z.string().nullable(),
  airline_name: z.string().nullable(),
  hotel_name: z.string().nullable(),
  vehicle_name: z.string().nullable(),
  vehicle_no: z.string().nullable(),
  journey_type: z.string().nullable(),
  type: z.string().nullable(),
  status_id: z.string().nullable(),
  user: z.any().nullable(),
  user_id: z.string().nullable(),
  product_id: z.string().nullable(),
  members: z.any().nullable(),
  items: z.any().nullable(),
  discount_price: z.string().nullable(),
  pp_from: z
    .object({
      airport_from: z
        .object({
          code: z.string().nullable(),
        })
        .nullable(),
    })
    .nullable(),

  pp_to: z
    .object({
      airport_to: z
        .object({
          code: z.string().nullable(),
        })
        .nullable(),
    })
    .nullable(),
})
export type CustomerVisaListItem = z.infer<typeof CustomerVisaListItemSchema>

export const CustomerVisaListResponseSchema = httpGetListResponseSchemaBuilder(CustomerVisaListItemSchema)
export type CustomerVisaListResponse = z.infer<typeof CustomerVisaListResponseSchema>

export const getList = async <ResponseType = CustomerVisaListResponse>({
  params,
  options,
}: {
  params: CustomerVisaListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/orders?type=visa',
  })
  return response?.data
}
