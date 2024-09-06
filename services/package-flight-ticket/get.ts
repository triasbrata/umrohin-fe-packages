import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const PackageFlightTicketListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
})
export type PackageFlightTicketListParams = z.infer<typeof PackageFlightTicketListParamsSchema>

export const PackageFlightTicketListItemSchema = z.object({
  id: z.string(),
  rute_id: z.string().nullable(),
  rute: z
    .object({
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
    })
    .nullable(),
  airline_id: z.string().nullable(),
  airline: z
    .object({
      code: z.string(),
      name: z.string(),
    })
    .nullable(),
  provider_id: z.string().nullable(),
  provider: z
    .object({
      name: z.string(),
    })
    .nullable(),
  departure_date: z.any(),
  arrived_date: z.any(),
  departure_time: z.any(),
  arrived_time: z.any(),
  class_id: z.string().nullable(),
  class: z
    .object({
      code: z.string(),
      name: z.string(),
    })
    .nullable(),
  price: z.string().nullable(),
  discount_percentage: z.string().nullable(),
  discount_price: z.string().nullable(),
  final_price: z.string().nullable(),
  is_transit: z.boolean().nullable(),
  is_active: z.boolean(),
  flight_code: z.string().nullable(),
  ticket_no: z.string().nullable(),
  meals: z.boolean(),
  terminal_arrived: z.string().nullable(),
  baggage: z.string().nullable(),
  cabin_baggage: z.string().nullable(),
  tickets_count: z.string(),
  tickets_booked: z.string(),
  tickets_sold: z.string(),
  tickets_ready: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  price_baby: z.string().nullable(),
  discount_baby_percentage: z.string().nullable(),
  discount_baby_price: z.string().nullable(),
  parent_id: z.string().nullable(),
  flight_type: z.string().nullable(),
  sub: z
    .object({
      id: z.string(),
      rute_id: z.string().nullable(),
      airline_id: z.string().nullable(),
      provider_id: z.string().nullable(),
      departure_date: z.string().nullable(),
      arrived_date: z.string().nullable(),
      departure_time: z.string().nullable(),
      arrived_time: z.string().nullable(),
      class_id: z.string().nullable(),
      price: z.string().nullable(),
      discount_percentage: z.string().nullable(),
      discount_price: z.string().nullable(),
      final_price: z.string().nullable(),
      is_transit: z.boolean().nullable(),
      flight_code: z.string().nullable(),
      ticket_no: z.string().nullable(),
      created_at: z.string(),
      updated_at: z.string(),
      meals: z.boolean(),
      terminal_arrived: z.string().nullable(),
      baggage: z.string().nullable(),
      cabin_baggage: z.string().nullable(),
      is_active: z.boolean(),
      price_baby: z.string().nullable(),
      discount_baby_percentage: z.string().nullable(),
      discount_baby_price: z.string().nullable(),
      parent_id: z.string().nullable(),
      flight_type: z.string().nullable(),
      rute: z
        .object({
          id: z.string(),
          from_city_id: z.string(),
          to_city_id: z.string(),
          from_airport_id: z.string(),
          to_airport_id: z.string(),
          created_at: z.string(),
          updated_at: z.string(),
          is_active: z.boolean(),
          city_from: z.object({
            id: z.string(),
            code: z.string(),
            name: z.string(),
          }),
          city_to: z.object({
            id: z.string(),
            code: z.string(),
            name: z.string(),
          }),
          airport_from: z.object({
            id: z.string(),
            country_id: z.string(),
            code: z.string(),
            city_name: z.string(),
          }),
          airport_to: z.object({
            id: z.string(),
            country_id: z.string(),
            code: z.string(),
            city_name: z.string(),
          }),
        })
        .nullable(),
    })
    .nullable(),
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
