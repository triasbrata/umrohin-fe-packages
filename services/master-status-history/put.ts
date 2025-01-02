import { HttpBaseResponseMetaSchema, httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterStatusHistoryUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterStatusHistoryUpdateItemParams = z.infer<typeof MasterStatusHistoryUpdateItemParamsSchema>

export const MasterStatusHistoryUpdateItemBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  order: z.number(),
  is_active: z.boolean(),
})
export type MasterStatusHistoryUpdateItemBody = z.infer<typeof MasterStatusHistoryUpdateItemBodySchema>

export const MasterStatusHistoryUpdateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  order: z.number(),
  is_active: z.boolean(),
})
export type MasterStatusHistoryUpdateItemResult = z.infer<typeof MasterStatusHistoryUpdateItemResultSchema>

export const MasterStatusHistoryUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterStatusHistoryUpdateItemResultSchema
)
export type MasterStatusHistoryUpdateItemResponse = z.infer<typeof MasterStatusHistoryUpdateItemResponseSchema>

export const updateItem = async <ResponseType = MasterStatusHistoryUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterStatusHistoryUpdateItemParams
  body: MasterStatusHistoryUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/status_history/${id}`,
  })
  return response?.data
}

// Activation
export const MasterStatusHistoryActivationItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterStatusHistoryActivationItemParams = z.infer<typeof MasterStatusHistoryActivationItemParamsSchema>

export const MasterStatusHistoryActivationItemBodySchema = z.object({ is_active: z.boolean() })
export type MasterStatusHistoryActivationItemBody = z.infer<typeof MasterStatusHistoryActivationItemBodySchema>

export const MasterStatusHistoryActivationItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterStatusHistoryActivationItemResponse = z.infer<typeof MasterStatusHistoryActivationItemResponseSchema>

export const activateItem = async <ResponseType = MasterStatusHistoryActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterStatusHistoryActivationItemParams
  body: MasterStatusHistoryActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/status_history/${id}`,
  })
  return response?.data
}
