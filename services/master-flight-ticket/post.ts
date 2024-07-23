import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const MasterFlightTicketCreateItemBodySchema = zfd.formData({
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
})
export type MasterFlightTicketCreateItemBody = z.infer<typeof MasterFlightTicketCreateItemBodySchema>

export const MasterFlightTicketCreateItemResultSchema = z.object({
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
})
export type MasterFlightTicketCreateItemResult = z.infer<typeof MasterFlightTicketCreateItemResultSchema>

export const MasterFlightTicketCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterFlightTicketCreateItemResultSchema.nullable()
)
export type MasterFlightTicketCreateItemResponse = z.infer<typeof MasterFlightTicketCreateItemResponseSchema>

export const createItem = async <ResponseType = MasterFlightTicketCreateItemResponse>({
  body,
  options,
}: {
  body: MasterFlightTicketCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: '/v1/flights_tickets',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
