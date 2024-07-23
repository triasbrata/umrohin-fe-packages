import { httpGetDetailResponseSchemaBuilder, HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const MasterFlightRouteUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterFlightRouteUpdateItemParams = z.infer<typeof MasterFlightRouteUpdateItemParamsSchema>

export const MasterFlightRouteUpdateItemBodySchema = zfd.formData({
  from_airport_id: zfd.text(),
  to_airport_id: zfd.text(),
})
export type MasterFlightRouteUpdateItemBody = z.infer<typeof MasterFlightRouteUpdateItemBodySchema>

export const MasterFlightRouteUpdateItemResultSchema = z.object({
  id: z.string(),
  from_airport_id: z.string(),
  to_airport_id: z.string(),
})
export type MasterFlightRouteUpdateItemResult = z.infer<typeof MasterFlightRouteUpdateItemResultSchema>

export const MasterFlightRouteUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterFlightRouteUpdateItemResultSchema
)
export type MasterFlightRouteUpdateItemResponse = z.infer<typeof MasterFlightRouteUpdateItemResponseSchema>

export const updateItem = async <ResponseType = MasterFlightRouteUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterFlightRouteUpdateItemParams
  body: MasterFlightRouteUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'put',
    url: `/v1/flights_route/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

// Activation
export const MasterFlightRouteActivationItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterFlightRouteActivationItemParams = z.infer<typeof MasterFlightRouteActivationItemParamsSchema>

export const MasterFlightRouteActivationItemBodySchema = zfd.formData({ is_active: z.boolean() })
export type MasterFlightRouteActivationItemBody = z.infer<typeof MasterFlightRouteActivationItemBodySchema>

export const MasterFlightRouteActivationItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterFlightRouteActivationItemResponse = z.infer<typeof MasterFlightRouteActivationItemResponseSchema>

export const activateItem = async <ResponseType = MasterFlightRouteActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterFlightRouteActivationItemParams
  body: MasterFlightRouteActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/actions_up/flight_route/${id}`,
  })
  return response?.data
}
