import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterFlightTicketDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterFlightTicketDeleteItemParams = z.infer<typeof MasterFlightTicketDeleteItemParamsSchema>

export const MasterFlightTicketDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterFlightTicketDeleteItemResponse = z.infer<typeof MasterFlightTicketDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = MasterFlightTicketDeleteItemResponse>({
  params,
  options,
}: {
  params: MasterFlightTicketDeleteItemParams
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
