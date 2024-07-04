import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const CustomerDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type CustomerDeleteItemParams = z.infer<typeof CustomerDeleteItemParamsSchema>

export const CustomerDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type CustomerDeleteItemResponse = z.infer<typeof CustomerDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = CustomerDeleteItemResponse>({
  params,
  options,
}: {
  params: CustomerDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `v1/customers/${id}`,
  })
  return response?.data
}
