import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

// Define the schema for the request parameters
export const TransactionTicketListParamsSchema = z.object({
  sort_by: z.enum(['asc', 'desc']).optional(),
  order_by: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type TransactionTicketListParams = z.infer<typeof TransactionTicketListParamsSchema>

// Define the schema for an individual transaction ticket item
export const TransactionTicketListItemSchema = z.object({
  id: z.string(),
  from_airport_id: z.string().nullable(),
  to_airport_id: z.string().nullable(),
  airline_id: z.string().nullable(),
  no: z.string(),
  prefix: z.string().nullable(),
  ref_no: z.string().nullable(),
  channel_id: z.string().nullable(),
  currency_id: z.string(),
  total: z.string(),
  discount: z.string(),
  tax_percentage: z.string(),
  tax_price: z.string(),
  fee: z.string().nullable(),
  others: z.string().nullable(),
  grand_total: z.string(),
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
  journey_type: z.string(),
  type: z.string(),
  status_id: z.string().nullable(),
  user: z.any(), // You might want to define this more specifically based on the user object
  user_id: z.string(),
  product_id: z.string(),
  discount_price: z.string().nullable(),
  booking_id: z.string().nullable(),
})
export type TransactionTicketListItem = z.infer<typeof TransactionTicketListItemSchema>

// Build the schema for the list response using the item schema
export const TransactionTicketListResponseSchema = httpGetListResponseSchemaBuilder(TransactionTicketListItemSchema)
export type TransactionTicketListResponse = z.infer<typeof TransactionTicketListResponseSchema>

// Function to fetch the list of transaction tickets
export const getList = async <ResponseType = TransactionTicketListResponse>({
  params,
  options,
}: {
  params: TransactionTicketListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/orders?sort_by=asc&order_by=created_at',
  })
  return response?.data
}
