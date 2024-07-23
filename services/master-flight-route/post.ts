import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const MasterFlightRouteCreateItemBodySchema = zfd.formData({
  from_airport_id: zfd.text(),
  to_airport_id: zfd.text(),
})
export type MasterFlightRouteCreateItemBody = z.infer<typeof MasterFlightRouteCreateItemBodySchema>

export const MasterFlightRouteCreateItemResultSchema = z.object({
  id: z.string(),
  from_airport_id: z.string(),
  to_airport_id: z.string(),
})
export type MasterFlightRouteCreateItemResult = z.infer<typeof MasterFlightRouteCreateItemResultSchema>

export const MasterFlightRouteCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterFlightRouteCreateItemResultSchema.nullable()
)
export type MasterFlightRouteCreateItemResponse = z.infer<typeof MasterFlightRouteCreateItemResponseSchema>

export const createItem = async <ResponseType = MasterFlightRouteCreateItemResponse>({
  body,
  options,
}: {
  body: MasterFlightRouteCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'post',
    url: '/v1/flights_route',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
