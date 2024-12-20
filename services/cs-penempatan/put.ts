import { HttpBaseResponseMetaSchema, httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const CSPenempatanUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type CSPenempatanUpdateItemParams = z.infer<typeof CSPenempatanUpdateItemParamsSchema>

export const CSPenempatanUpdateItemBodySchema = z.object({
  name: z.string(),
  code: z.string(),
})
export type CSPenempatanUpdateItemBody = z.infer<typeof CSPenempatanUpdateItemBodySchema>

export const CSPenempatanUpdateItemResultSchema = z.object({
  name: z.string(),
  code: z.string(),
})
export type CSPenempatanUpdateItemResult = z.infer<typeof CSPenempatanUpdateItemResultSchema>

export const CSPenempatanUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  CSPenempatanUpdateItemResultSchema
)
export type CSPenempatanUpdateItemResponse = z.infer<typeof CSPenempatanUpdateItemResponseSchema>

export const updateItem = async <ResponseType = CSPenempatanUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: CSPenempatanUpdateItemParams
  body: CSPenempatanUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/wa_positions/${id}`,
  })
  return response?.data
}

// ACTIVATION CSPenempatan
export const CSPenempatanActivationItemParamsSchema = z.object({ id: z.string().optional() })
export type CSPenempatanActivationItemParams = z.infer<typeof CSPenempatanActivationItemParamsSchema>

export const CSPenempatanActivationItemBodySchema = z.object({ is_active: z.boolean() })
export type CSPenempatanActivationItemBody = z.infer<typeof CSPenempatanActivationItemBodySchema>

export const CSPenempatanActivationItemResponseSchema = HttpBaseResponseMetaSchema
export type CSPenempatanActivationItemResponse = z.infer<typeof CSPenempatanActivationItemResponseSchema>

export const activateItem = async <ResponseType = CSPenempatanActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: CSPenempatanActivationItemParams
  body: CSPenempatanActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/wa_positions/${id}`,
  })
  return response?.data
}
