import { httpGetDetailResponseSchemaBuilder, HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const MasterFlightTicketUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterFlightTicketUpdateItemParams = z.infer<typeof MasterFlightTicketUpdateItemParamsSchema>

export const MasterFlightTicketUpdateItemBodySchema = zfd.formData({
  rute_id: z.any(),
  rute_from_airport_id: zfd.text().optional(),
  rute_to_airport_id: zfd.text().optional(),

  airline_id: zfd.text(),

  provider_id: z.any(),
  provider_name: zfd.text().optional(),
  provider_pic_name: zfd.text().optional(),
  provider_pic_phone: zfd.text().optional(),
  provider_address: zfd.text().optional(),
  provider_type: zfd.text().optional(),

  departure_date: zfd.text(),
  arrived_date: zfd.text(),
  departure_time: zfd.text(),
  arrived_time: zfd.text(),
  class_id: zfd.text(),
  price: zfd.text(),
  discount_percentage: zfd.text(),
  discount_price: zfd.text(),
  final_price: zfd.text(),
  is_transit: z.boolean(),
  flight_code: zfd.text(),
  ticket_no: zfd.text(),
  meals: z.boolean(),
  terminal_arrived: zfd.text(),
  baggage: zfd.text(),
  cabin_baggage: zfd.text(),

  list_tickets: zfd.text().array().optional(),
})
export type MasterFlightTicketUpdateItemBody = z.infer<typeof MasterFlightTicketUpdateItemBodySchema>

export const MasterFlightTicketUpdateItemResultSchema = z.object({
  id: z.string(),
  rute_id: z.string(),
  airline_id: z.string(),
  provider_id: z.string(),
  departure_date: z.string(),
  arrived_date: z.string(),
  departure_time: z.string(),
  arrived_time: z.string(),
  class_id: z.string(),
  price: z.string(),
  discount_percentage: z.string(),
  discount_price: z.string(),
  final_price: z.string(),
  is_transit: z.boolean(),
  flight_code: z.string(),
  ticket_no: z.string(),
  meals: z.boolean(),
  terminal_arrived: z.string(),
  baggage: z.string(),
  cabin_baggage: z.string(),
  list_tickets: z.any(),
})
export type MasterFlightTicketUpdateItemResult = z.infer<typeof MasterFlightTicketUpdateItemResultSchema>

export const MasterFlightTicketUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterFlightTicketUpdateItemResultSchema
)
export type MasterFlightTicketUpdateItemResponse = z.infer<typeof MasterFlightTicketUpdateItemResponseSchema>

export const updateItem = async <ResponseType = MasterFlightTicketUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterFlightTicketUpdateItemParams
  body: MasterFlightTicketUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/flights_tickets/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

// Activation
export const MasterFlightTicketActivationItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterFlightTicketActivationItemParams = z.infer<typeof MasterFlightTicketActivationItemParamsSchema>

export const MasterFlightTicketActivationItemBodySchema = zfd.formData({ is_active: z.boolean() })
export type MasterFlightTicketActivationItemBody = z.infer<typeof MasterFlightTicketActivationItemBodySchema>

export const MasterFlightTicketActivationItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterFlightTicketActivationItemResponse = z.infer<typeof MasterFlightTicketActivationItemResponseSchema>

export const activateItem = async <ResponseType = MasterFlightTicketActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterFlightTicketActivationItemParams
  body: MasterFlightTicketActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/actions_up/flight_tickets/${id}`,
  })
  return response?.data
}
