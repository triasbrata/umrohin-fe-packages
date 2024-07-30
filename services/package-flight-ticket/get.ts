import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const PackageFlightTicketListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type PackageFlightTicketListParams = z.infer<typeof PackageFlightTicketListParamsSchema>

export const PackageFlightTicketListItemSchema = z.object({
  id: z.string(),
  rute_id: z.string(),
  rute: z.object({
    id: z.string(),
    from_airport_id: z.string(),
    to_airport_id: z.string(),
    airport_from: z.object({
      code: z.string(),
      city_name: z.string(),
    }),
    airport_to: z.object({
      code: z.string(),
      city_name: z.string(),
    }),
    city_from: z.object({
      code: z.string(),
      name: z.string(),
    }),
    city_to: z.object({
      code: z.string(),
      name: z.string(),
    }),
  }),
  airline_id: z.string(),
  airline: z.object({
    code: z.string(),
    name: z.string(),
  }),
  provider_id: z.string(),
  provider: z.object({
    name: z.string(),
  }),
  departure_date: z.string(),
  arrived_date: z.string(),
  departure_time: z.string(),
  arrived_time: z.string(),
  class_id: z.string(),
  class: z.object({
    code: z.string(),
    name: z.string(),
  }),
  price: z.string(),
  discount_percentage: z.string(),
  discount_price: z.string(),
  final_price: z.string(),
  is_transit: z.boolean(),
  is_active: z.boolean(),
  flight_code: z.string(),
  ticket_no: z.string(),
  meals: z.boolean(),
  terminal_arrived: z.string(),
  baggage: z.string(),
  cabin_baggage: z.string(),
  tickets_count: z.string(),
  tickets_ready: z.string(),
})
export type PackageFlightTicketListItem = z.infer<typeof PackageFlightTicketListItemSchema>

export const PackageFlightTicketListResponseSchema = httpGetListResponseSchemaBuilder(PackageFlightTicketListItemSchema)
export type PackageFlightTicketListResponse = z.infer<typeof PackageFlightTicketListResponseSchema>

export const getList = async <ResponseType = PackageFlightTicketListResponse>({
  params,
  options,
}: {
  params: PackageFlightTicketListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/flights_tickets',
  })
  return response?.data
}
