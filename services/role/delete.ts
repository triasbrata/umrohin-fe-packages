import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const InternalUserDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type InternalUserDeleteItemParams = z.infer<typeof InternalUserDeleteItemParamsSchema>

export const InternalUserDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type InternalUserDeleteItemResponse = z.infer<typeof InternalUserDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = InternalUserDeleteItemResponse>({
  params,
  options,
}: {
  params: InternalUserDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/users_internal/${id}`,
  })
  return response?.data
}
