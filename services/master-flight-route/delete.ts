import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterFlightRouteDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterFlightRouteDeleteItemParams = z.infer<typeof MasterFlightRouteDeleteItemParamsSchema>

export const MasterFlightRouteDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterFlightRouteDeleteItemResponse = z.infer<typeof MasterFlightRouteDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = MasterFlightRouteDeleteItemResponse>({
  params,
  options,
}: {
  params: MasterFlightRouteDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/flights_route/${id}`,
  })
  return response?.data
}
