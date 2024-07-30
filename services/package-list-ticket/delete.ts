import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const PackageListTicketDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type PackageListTicketDeleteItemParams = z.infer<typeof PackageListTicketDeleteItemParamsSchema>

export const PackageListTicketDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type PackageListTicketDeleteItemResponse = z.infer<typeof PackageListTicketDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = PackageListTicketDeleteItemResponse>({
  params,
  options,
}: {
  params: PackageListTicketDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/tickets/${id}`,
  })
  return response?.data
}
