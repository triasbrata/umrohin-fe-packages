import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const PackageFlightTicketDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type PackageFlightTicketDeleteItemParams = z.infer<typeof PackageFlightTicketDeleteItemParamsSchema>

export const PackageFlightTicketDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type PackageFlightTicketDeleteItemResponse = z.infer<typeof PackageFlightTicketDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = PackageFlightTicketDeleteItemResponse>({
  params,
  options,
}: {
  params: PackageFlightTicketDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/flights_tickets/${id}`,
  })
  return response?.data
}
