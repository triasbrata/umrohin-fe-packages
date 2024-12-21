import { HttpBaseResponseMetaSchema, httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const CustomerServiceUpdateItemParamsSchema = z.object({ id: z.string() })
export type CustomerServiceUpdateItemParams = z.infer<typeof CustomerServiceUpdateItemParamsSchema>

export const CustomerServiceUpdateItemBodySchema = z.object({
  name: z.string(),
  wa_number: z.string(),
  position_id: z.any(),
  visit: z.any(),
  is_active: z.boolean(),
})
export type CustomerServiceUpdateItemBody = z.infer<typeof CustomerServiceUpdateItemBodySchema>

export const CustomerServiceUpdateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  wa_number: z.string(),
  position_id: z.any(),
  visit: z.any(),
  is_active: z.boolean(),
})
export type CustomerServiceUpdateItemResult = z.infer<typeof CustomerServiceUpdateItemResultSchema>

export const CustomerServiceUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerServiceUpdateItemResultSchema
)
export type CustomerServiceUpdateItemResponse = z.infer<typeof CustomerServiceUpdateItemResponseSchema>

export const updateCustomerService = async <ResponseType = CustomerServiceUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: CustomerServiceUpdateItemParams
  body: CustomerServiceUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/wa_contacts/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response?.data
}

// Activation
export const PositionActivationItemParamsSchema = z.object({ id: z.string() })
export type PositionActivationItemParams = z.infer<typeof PositionActivationItemParamsSchema>

export const PositionActivationItemBodySchema = z.object({ is_active: z.boolean() })
export type PositionActivationItemBody = z.infer<typeof PositionActivationItemBodySchema>

export const PositionActivationItemResponseSchema = HttpBaseResponseMetaSchema
export type PositionActivationItemResponse = z.infer<typeof PositionActivationItemResponseSchema>

export const activatePosition = async <ResponseType = PositionActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: PositionActivationItemParams
  body: PositionActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/wa_contacts/${id}`,
  })
  return response?.data
}
