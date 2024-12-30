import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const BenefitCreateItemBodySchema = z.object({
  leader_id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  is_general: z.boolean(),
  is_active: z.boolean(),
})
export type BenefitCreateItemBody = z.infer<typeof BenefitCreateItemBodySchema>

export const BenefitCreateItemResultSchema = z.object({
  leader_id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  is_general: z.boolean(),
  is_active: z.boolean(),
})
export type BenefitCreateItemResult = z.infer<typeof BenefitCreateItemResultSchema>

export const BenefitCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(BenefitCreateItemResultSchema)
export type BenefitCreateItemResponse = z.infer<typeof BenefitCreateItemResponseSchema>

export const createItem = async <ResponseType = BenefitCreateItemResponse>({
  body,
  options,
}: {
  body: BenefitCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: '/v1/leaders_benefits',
  })
  return response?.data
}
