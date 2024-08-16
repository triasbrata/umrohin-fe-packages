import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

const booleanFromText = zfd.text().transform((val) => val === 'true')

export const MasterFlightRouteCreateItemBodySchema = zfd.formData({
  from_airport_id: zfd.text(),
  to_airport_id: zfd.text(),
  is_active: booleanFromText,
})
export type MasterFlightRouteCreateItemBody = z.infer<typeof MasterFlightRouteCreateItemBodySchema>

export const MasterFlightRouteCreateItemResultSchema = z.object({
  id: z.string(),
  from_airport_id: z.string(),
  to_airport_id: z.string(),
  is_active: z.boolean(),
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

  Object.entries(body).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      formData.append(key, value.toString())
    } else {
      formData.append(key, value as string)
    }
  })

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
