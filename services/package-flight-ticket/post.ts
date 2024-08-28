import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const PackageFlightTicketCreateItemBodySchema = zfd.formData({
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

  departure_date: z.any(),
  arrived_date: z.any(),
  departure_time: z.any(),
  arrived_time: z.any(),
  class_id: zfd.text(),
  price: zfd.numeric(),
  price_baby: zfd.numeric(),
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
  // KEPULANGAN
  back_rute_id: z.any(),
  back_airline_id: zfd.text(),
  back_provider_id: z.any(),
  back_departure_date: z.any(),
  back_departure_time: z.any(),
  back_arrived_date: z.any(),
  back_arrived_time: z.any(),
  back_flight_code: zfd.text(),
})
export type PackageFlightTicketCreateItemBody = z.infer<typeof PackageFlightTicketCreateItemBodySchema>

export const PackageFlightTicketCreateItemResultSchema = z.object({
  id: z.string(),
  rute_id: z.string(),
  airline_id: z.string(),
  provider_id: z.string(),
  departure_date: z.string(),
  arrived_date: z.string(),
  departure_time: z.string(),
  arrived_time: z.string(),
  class_id: z.string(),
  price: z.number(),
  price_baby: z.number(),
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
  // KEPULANGAN
  back_rute_id: z.string(),
  back_airline_id: z.string(),
  back_provider_id: z.string(),
  back_departure_date: z.string(),
  back_departure_time: z.string(),
  back_arrived_date: z.string(),
  back_arrived_time: z.string(),
  back_flight_code: z.string(),
})
export type PackageFlightTicketCreateItemResult = z.infer<typeof PackageFlightTicketCreateItemResultSchema>

export const PackageFlightTicketCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  PackageFlightTicketCreateItemResultSchema.nullable()
)
export type PackageFlightTicketCreateItemResponse = z.infer<typeof PackageFlightTicketCreateItemResponseSchema>

export const createItem = async <ResponseType = PackageFlightTicketCreateItemResponse>({
  body,
  options,
}: {
  body: PackageFlightTicketCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: '/v1/flights_tickets',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response?.data
}
