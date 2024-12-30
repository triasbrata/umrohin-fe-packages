import { HttpBaseResponseMetaSchema, httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const BenefitUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type BenefitUpdateItemParams = z.infer<typeof BenefitUpdateItemParamsSchema>

export const BenefitUpdateItemBodySchema = z.object({
  leader_id: z.string().optional().nullable(),
  title: z.string(),
  description: z.string(),
  is_general: z.boolean(),
  is_active: z.boolean(),
})
export type BenefitUpdateItemBody = z.infer<typeof BenefitUpdateItemBodySchema>

export const BenefitUpdateItemResultSchema = z.object({
  leader_id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  is_general: z.boolean(),
  is_active: z.boolean(),
})
export type BenefitUpdateItemResult = z.infer<typeof BenefitUpdateItemResultSchema>

export const BenefitUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(BenefitUpdateItemResultSchema)
export type BenefitUpdateItemResponse = z.infer<typeof BenefitUpdateItemResponseSchema>

export const updateItem = async <ResponseType = BenefitUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: BenefitUpdateItemParams
  body: BenefitUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/leaders_benefits/${id}`,
  })
  return response?.data
}

// Activation
export const BenefitActivationItemParamsSchema = z.object({ id: z.string().optional() })
export type BenefitActivationItemParams = z.infer<typeof BenefitActivationItemParamsSchema>

export const BenefitActivationItemBodySchema = zfd.formData({ is_active: z.boolean() })
export type BenefitActivationItemBody = z.infer<typeof BenefitActivationItemBodySchema>

export const BenefitActivationItemResponseSchema = HttpBaseResponseMetaSchema
export type BenefitActivationItemResponse = z.infer<typeof BenefitActivationItemResponseSchema>

export const activateItem = async <ResponseType = BenefitActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: BenefitActivationItemParams
  body: BenefitActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/leaders_benefits/${id}`,
  })
  return response?.data
}
