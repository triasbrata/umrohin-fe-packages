import { HttpBaseResponseMetaSchema, httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const PackageFlightTicketUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type PackageFlightTicketUpdateItemParams = z.infer<typeof PackageFlightTicketUpdateItemParamsSchema>

export const PackageFlightTicketUpdateItemBodySchema = zfd.formData({
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
  departure_time: z.any().optional(),
  arrived_time: z.any().optional(),
  class_id: zfd.text(),
  price: zfd.numeric(),
  price_baby: zfd.numeric().optional().nullable(),
  discount_percentage: zfd.text(),
  discount_price: zfd.text(),
  final_price: zfd.text(),
  is_transit: z.boolean(),
  flight_code: zfd.text().optional().nullable(),
  ticket_no: zfd.text(),
  meals: z.boolean(),
  terminal_arrived: zfd.text(),
  baggage: zfd.text(),
  cabin_baggage: zfd.text(),
  list_tickets: zfd.text().array().optional(),
  // KEPULANGAN
  back_rute_id: z.any(),
  back_airline_id: zfd.text(),
  back_provider_id: z.any(),
  back_departure_date: zfd.text(),
  back_departure_time: zfd.text().optional().nullable(),
  back_arrived_date: zfd.text(),
  back_arrived_time: zfd.text().optional().nullable(),
  back_flight_code: zfd.text().optional().nullable(),
})
export type PackageFlightTicketUpdateItemBody = z.infer<typeof PackageFlightTicketUpdateItemBodySchema>

export const PackageFlightTicketUpdateItemResultSchema = z.object({
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
  discount_percentage: z.string(),
  discount_price: z.string(),
  final_price: z.string(),
  is_transit: z.boolean(),
  flight_code: z.string().nullable(),
  ticket_no: z.string(),
  meals: z.boolean(),
  terminal_arrived: z.string(),
  baggage: z.string(),
  cabin_baggage: z.string(),
  list_tickets: z.any(),
  // KEPULANGAN
  back_rute_id: z.string(),
  back_airline_id: z.string(),
  back_provider_id: z.string(),
  back_departure_date: z.string(),
  back_departure_time: z.string().nullable(),
  back_arrived_date: z.string(),
  back_arrived_time: z.string().nullable(),
  back_flight_code: z.string().nullable(),
})
export type PackageFlightTicketUpdateItemResult = z.infer<typeof PackageFlightTicketUpdateItemResultSchema>

export const PackageFlightTicketUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  PackageFlightTicketUpdateItemResultSchema
)
export type PackageFlightTicketUpdateItemResponse = z.infer<typeof PackageFlightTicketUpdateItemResponseSchema>

export const updateItem = async <ResponseType = PackageFlightTicketUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: PackageFlightTicketUpdateItemParams
  body: PackageFlightTicketUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/flights_tickets/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response?.data
}

// Activation
export const PackageFlightTicketActivationItemParamsSchema = z.object({ id: z.string().optional() })
export type PackageFlightTicketActivationItemParams = z.infer<typeof PackageFlightTicketActivationItemParamsSchema>

export const PackageFlightTicketActivationItemBodySchema = zfd.formData({ is_active: z.boolean() })
export type PackageFlightTicketActivationItemBody = z.infer<typeof PackageFlightTicketActivationItemBodySchema>

export const PackageFlightTicketActivationItemResponseSchema = HttpBaseResponseMetaSchema
export type PackageFlightTicketActivationItemResponse = z.infer<typeof PackageFlightTicketActivationItemResponseSchema>

export const activateItem = async <ResponseType = PackageFlightTicketActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: PackageFlightTicketActivationItemParams
  body: PackageFlightTicketActivationItemBody
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
