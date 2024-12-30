import { HttpBaseResponseMetaSchema, httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const FAQUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type FAQUpdateItemParams = z.infer<typeof FAQUpdateItemParamsSchema>

export const FAQUpdateItemBodySchema = z.object({
  leader_id: z.string().optional().nullable(),
  title: z.string(),
  description: z.string(),
  is_general: z.boolean(),
  is_active: z.boolean(),
})
export type FAQUpdateItemBody = z.infer<typeof FAQUpdateItemBodySchema>

export const FAQUpdateItemResultSchema = z.object({
  leader_id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  is_general: z.boolean(),
  is_active: z.boolean(),
})
export type FAQUpdateItemResult = z.infer<typeof FAQUpdateItemResultSchema>

export const FAQUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(FAQUpdateItemResultSchema)
export type FAQUpdateItemResponse = z.infer<typeof FAQUpdateItemResponseSchema>

export const updateItem = async <ResponseType = FAQUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: FAQUpdateItemParams
  body: FAQUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/leaders_faq/${id}`,
  })
  return response?.data
}

// Activation
export const FAQActivationItemParamsSchema = z.object({ id: z.string().optional() })
export type FAQActivationItemParams = z.infer<typeof FAQActivationItemParamsSchema>

export const FAQActivationItemBodySchema = zfd.formData({ is_active: z.boolean() })
export type FAQActivationItemBody = z.infer<typeof FAQActivationItemBodySchema>

export const FAQActivationItemResponseSchema = HttpBaseResponseMetaSchema
export type FAQActivationItemResponse = z.infer<typeof FAQActivationItemResponseSchema>

export const activateItem = async <ResponseType = FAQActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: FAQActivationItemParams
  body: FAQActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/leaders_faq/${id}`,
  })
  return response?.data
}
