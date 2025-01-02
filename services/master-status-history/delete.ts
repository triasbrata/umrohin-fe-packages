import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterStatusHistoryDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterStatusHistoryDeleteItemParams = z.infer<typeof MasterStatusHistoryDeleteItemParamsSchema>

export const MasterStatusHistoryDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterStatusHistoryDeleteItemResponse = z.infer<typeof MasterStatusHistoryDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = MasterStatusHistoryDeleteItemResponse>({
  params,
  options,
}: {
  params: MasterStatusHistoryDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/status_history/${id}`,
  })
  return response?.data
}
