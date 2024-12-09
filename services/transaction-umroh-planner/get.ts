import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

// Define the schema for the request parameters
export const TransactionUmrohPlannerListParamsSchema = z.object({
  sort_by: z.enum(['asc', 'desc']).optional(),
  order_by: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
})
export type TransactionUmrohPlannerListParams = z.infer<typeof TransactionUmrohPlannerListParamsSchema>

// Define the schema for an individual transaction ticket item
export const TransactionUmrohPlannerListItemSchema = z.object({
  id: z.string(),
  from_airport_id: z.string().nullable(),
  to_airport_id: z.string().nullable(),
  airline_id: z.string().nullable(),
  no: z.string().nullable(),
  prefix: z.string().nullable(),
  ref_no: z.string().nullable(),
  channel_id: z.string().nullable(),
  currency_id: z.string().nullable(),
  total: z.string().nullable(),
  discount: z.string().nullable(),
  tax_percentage: z.string().nullable(),
  tax_price: z.string().nullable(),
  fee: z.string().nullable(),
  others: z.string().nullable(),
  grand_total: z.string().nullable(),
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
  type: z.string(),
  status_id: z.string().nullable(),
  user: z.any(),
  user_id: z.string(),
  product_id: z.string().nullable(),
  product_item: z.any().nullable(),
  planner: z.object({
    id: z.string(),
    order_id: z.string(),
    name: z.string(),
    whatsapp: z.string().nullable(),
    email: z.string().nullable(),
    gender: z.string().nullable(),
    date_planning: z.string().nullable(),
    days: z.string().nullable(),
    is_halal: z.boolean().nullable(),
    target_location: z.string().nullable(),
    umroh_first: z.boolean().nullable(),
    adult_qty: z.string().nullable(),
    children_qty: z.string().nullable(),
    infant_qty: z.string().nullable(),
    airport_id: z.string().nullable(),
    airport_target: z.string().nullable(),
    madinah_stars: z.string().nullable(),
    mekkah_stars: z.string().nullable(),
    note: z.string().nullable(),
    created_at: z.string().nullable(),
    updated_at: z.string().nullable(),
    tourist_destination: z.any(),
    airport: z.object({
      code: z.string().nullable(),
      airport_code: z.string().nullable(),
      international_name: z.string().nullable(),
    }),
  }),
  histories: z
    .array(
      z.object({
        id: z.string(),
        order_id: z.string(),
        status: z.string().nullable(),
        title: z.string().nullable(),
        description: z.string().nullable(),
        created_at: z.string().nullable(),
        updated_at: z.string().nullable(),
      })
    )
    .optional()
    .nullable(),
  items: z.any().nullable(),
  members: z.any().nullable(),
  discount_price: z.string().nullable(),
  booking_id: z.string().nullable(),
  created_at: z.any().nullable(),
})
export type TransactionUmrohPlannerListItem = z.infer<typeof TransactionUmrohPlannerListItemSchema>

export const TransactionUmrohPlannerListResponseSchema = httpGetListResponseSchemaBuilder(
  TransactionUmrohPlannerListItemSchema
)
export type TransactionUmrohPlannerListResponse = z.infer<typeof TransactionUmrohPlannerListResponseSchema>

export const getList = async <ResponseType = TransactionUmrohPlannerListResponse>({
  params,
  options,
}: {
  params: TransactionUmrohPlannerListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/orders?sort_by=desc&order_by=created_at&type=planner',
  })
  return response?.data
}
