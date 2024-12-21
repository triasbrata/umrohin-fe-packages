import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const CustomerServiceDeleteItemParamsSchema = z.object({ id: z.string() })
export type CustomerServiceDeleteItemParams = z.infer<typeof CustomerServiceDeleteItemParamsSchema>

export const CustomerServiceDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type CustomerServiceDeleteItemResponse = z.infer<typeof CustomerServiceDeleteItemResponseSchema>

export const deleteCustomerService = async <ResponseType = CustomerServiceDeleteItemResponse>({
  params,
  options,
}: {
  params: CustomerServiceDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/wa_contacts/${id}`,
  })
  return response?.data
}
