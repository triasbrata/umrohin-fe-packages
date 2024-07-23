import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterProviderDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterProviderDeleteItemParams = z.infer<typeof MasterProviderDeleteItemParamsSchema>

export const MasterProviderDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterProviderDeleteItemResponse = z.infer<typeof MasterProviderDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = MasterProviderDeleteItemResponse>({
  params,
  options,
}: {
  params: MasterProviderDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/ticket_providers/${id}`,
  })
  return response?.data
}
