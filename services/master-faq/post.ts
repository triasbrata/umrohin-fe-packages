import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const FAQCreateItemBodySchema = z.object({
  leader_id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  is_general: z.boolean(),
  is_active: z.boolean(),
})
export type FAQCreateItemBody = z.infer<typeof FAQCreateItemBodySchema>

export const FAQCreateItemResultSchema = z.object({
  leader_id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  is_general: z.boolean(),
  is_active: z.boolean(),
})
export type FAQCreateItemResult = z.infer<typeof FAQCreateItemResultSchema>

export const FAQCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(FAQCreateItemResultSchema)
export type FAQCreateItemResponse = z.infer<typeof FAQCreateItemResponseSchema>

export const createItem = async <ResponseType = FAQCreateItemResponse>({
  body,
  options,
}: {
  body: FAQCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: '/v1/leaders_faq',
  })
  return response?.data
}
