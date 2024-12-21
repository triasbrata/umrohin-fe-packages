import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const CustomerServiceCreateItemBodySchema = z.object({
  name: z.string(),
  wa_number: z.string(),
  positions: z.any(),
  visit: z.any(),
  is_active: z.boolean(),
})
export type CustomerServiceCreateItemBody = z.infer<typeof CustomerServiceCreateItemBodySchema>

export const CustomerServiceCreateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  wa_number: z.string(),
  position_id: z.any(),
  visit: z.any(),
  is_active: z.boolean(),
})
export type CustomerServiceCreateItemResult = z.infer<typeof CustomerServiceCreateItemResultSchema>

export const CustomerServiceCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerServiceCreateItemResultSchema
)
export type CustomerServiceCreateItemResponse = z.infer<typeof CustomerServiceCreateItemResponseSchema>

export const createCustomerService = async <ResponseType = CustomerServiceCreateItemResponse>({
  body,
  options,
}: {
  body: CustomerServiceCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: '/v1/wa_contacts',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response?.data
}
