import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const CustomerListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
})
export type CustomerListParams = z.infer<typeof CustomerListParamsSchema>

export const CustomerListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  status: z.string(),
})
export type CustomerListItem = z.infer<typeof CustomerListItemSchema>

export const CustomerListResponseSchema = httpGetListResponseSchemaBuilder(CustomerListItemSchema)
export type CustomerListResponse = z.infer<typeof CustomerListResponseSchema>

export const getList = async <ResponseType = CustomerListResponse>({
  params,
  options,
}: {
  params: CustomerListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/customers',
  })
  return response?.data
}
