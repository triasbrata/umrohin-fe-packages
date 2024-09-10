import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

// Define the schema for the request parameters
export const TransactionTicketListParamsSchema = z.object({
  sort_by: z.enum(['asc', 'desc']).optional(),
  search: z.string().optional(),
  order_by: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
})
export type TransactionTicketListParams = z.infer<typeof TransactionTicketListParamsSchema>

// Define the schema for an individual transaction ticket item
export const TransactionTicketListItemSchema = z.object({
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
  type: z.string().nullable(),
  status_id: z.string().nullable(),
  user: z
    .object({
      id: z.string(),
      role_id: z.string().nullable(),
      name: z.string().nullable(),
      username: z.string().nullable(),
      email: z.string().nullable(),
      phone: z.string().nullable(),
      avatar: z.string().nullable(),
      email_verified: z.boolean().nullable(),
      with_google: z.boolean().nullable(),
      with_facebook: z.boolean().nullable(),
      verified_email: z.boolean().nullable(),
      two_factor: z.boolean().nullable(),
      user_locale: z.string().nullable(),
      status: z.string().nullable(),
      created_at: z.string().nullable(),
      updated_at: z.string().nullable(),
      gender: z.string().nullable(),
      first_name: z.string().nullable(),
      last_name: z.string().nullable(),
      verified: z.boolean().nullable(),
    })
    .nullable(),
  user_id: z.string().nullable(),
  product_id: z.string().nullable(),
  discount_price: z.string().nullable(),
  booking_id: z.string().nullable(),
  members: z
    .array(
      z
        .object({
          id: z.string().nullable(),
          birth_date: z.string().nullable(),
          birth_location: z.string().nullable(),
          created_at: z.string().nullable(),
          document_expired: z.string().nullable(),
          document_issuence_date: z.string().nullable(),
          document_issuing_country: z.string().nullable(),
          document_no: z.string().nullable(),
          document_type: z.string().nullable(),
          email: z.string().nullable(),
          first_name: z.string().nullable(),
          gender: z.string().nullable(),
          last_name: z.string().nullable(),
          name: z.string().nullable(),
          nationality: z.string().nullable(),
          order_id: z.string().nullable(),
          phone: z.string().nullable(),
          title: z.string().nullable(),
          type: z.string().nullable(),
          updated_at: z.string().nullable(),
        })
        .nullable()
    )
    .nullable(),
  items: z
    .array(
      z
        .object({
          id: z.string().nullable(),
          order_id: z.string().nullable(),
          product_id: z.string().nullable(),
          title: z.string().nullable(),
          name: z.string().nullable(),
          gender: z.string().nullable(),
          phone: z.string().nullable(),
          price: z.string().nullable(),
          qty: z.string().nullable(),
          discount: z.any(),
          tax_percentage: z.any(),
          tax_price: z.any(),
          sub_total: z.string().nullable(),
          created_at: z.string().nullable(),
          updated_at: z.string().nullable(),
          type_name: z.string().nullable(),
          qty_dewasa: z.string().nullable(),
          qty_children: z.string().nullable(),
          qty_infant: z.string().nullable(),
        })
        .nullable()
    )
    .nullable(),
  flights: z.any(),
  pp_from: z
    .object({
      provider: z
        .object({
          name: z.string().nullable(),
        })
        .nullable(),
      departure_date: z.string().nullable(),
      departure_time: z.string().nullable(),
      arrived_date: z.string().nullable(),
      arrived_time: z.string().nullable(),
      class: z.object({ name: z.string().nullable() }),
      flight_code: z.string().nullable(),
      rute: z
        .object({
          airport_from: z
            .object({
              code: z.string().nullable(),
            })
            .nullable(),
        })
        .nullable(),
      price: z.string().nullable(),
      price_baby: z.string().nullable(),
    })
    .nullable(),
  pp_to: z
    .object({
      provider: z
        .object({
          name: z.string().nullable(),
        })
        .nullable(),
      departure_date: z.string().nullable(),
      departure_time: z.string().nullable(),
      arrived_date: z.string().nullable(),
      arrived_time: z.string().nullable(),
      class: z.object({ name: z.string().nullable() }),
      flight_code: z.string().nullable(),
      rute: z
        .object({
          airport_to: z
            .object({
              code: z.string().nullable(),
            })
            .nullable(),
        })
        .nullable(),
      price: z.string().nullable(),
      price_baby: z.string().nullable(),
    })
    .nullable(),
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
    url: '/v1/orders?sort_by=desc&order_by=created_at&type=flight',
  })
  return response?.data
}
