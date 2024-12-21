import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const CustomerServiceListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
})
export type CustomerServiceListParams = z.infer<typeof CustomerServiceListParamsSchema>

export const CustomerServiceListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  wa_number: z.string().nullable(),
  visit: z.any(),
  created_at: z.string(),
  updated_at: z.string(),
  is_active: z.boolean(),
  positions: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        code: z.string(),
        created_at: z.string(),
        updated_at: z.string(),
        text_message: z.string(),
        is_active: z.boolean(),
      })
    )
    .nullable(),
})

export type CustomerServiceListItem = z.infer<typeof CustomerServiceListItemSchema>

export const CustomerServiceListResponseSchema = httpGetListResponseSchemaBuilder(CustomerServiceListItemSchema)
export type CustomerServiceListResponse = z.infer<typeof CustomerServiceListResponseSchema>

export const getCustomerService = async <ResponseType = CustomerServiceListResponse>({
  params,
  options,
}: {
  params?: CustomerServiceListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/wa_contacts',
  })
  return response?.data
}
