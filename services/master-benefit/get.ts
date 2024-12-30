import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const BenefitListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_active: z.boolean().optional(),
  is_general: z.boolean().optional(),
  order_by: z.string().optional(),
  sort_by: z.enum(['asc', 'desc']).optional(),
})
export type BenefitListParams = z.infer<typeof BenefitListParamsSchema>

export const BenefitListItemSchema = z.object({
  id: z.string(),
  leader_id: z.string().optional().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  leader: z
    .object({
      id: z.string().nullable(),
      featured_image: z.string().nullable(),
      name: z.string().nullable(),
    })
    .nullable()
    .optional(),
  is_active: z.boolean(),
  is_general: z.boolean(),
})
export type BenefitListItem = z.infer<typeof BenefitListItemSchema>

export const BenefitListResponseSchema = httpGetListResponseSchemaBuilder(BenefitListItemSchema)
export type BenefitListResponse = z.infer<typeof BenefitListResponseSchema>

export const getList = async <ResponseType = BenefitListResponse>({
  params,
  options,
}: {
  params: BenefitListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/leaders_benefits',
  })
  return response?.data
}
