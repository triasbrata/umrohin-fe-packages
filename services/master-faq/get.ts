import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const FAQListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_active: z.boolean().optional(),
  is_general: z.boolean().optional(),
  order_by: z.string().optional(),
  sort_by: z.enum(['asc', 'desc']).optional(),
})
export type FAQListParams = z.infer<typeof FAQListParamsSchema>

export const FAQListItemSchema = z.object({
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
export type FAQListItem = z.infer<typeof FAQListItemSchema>

export const FAQListResponseSchema = httpGetListResponseSchemaBuilder(FAQListItemSchema)
export type FAQListResponse = z.infer<typeof FAQListResponseSchema>

export const getList = async <ResponseType = FAQListResponse>({
  params,
  options,
}: {
  params: FAQListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/leaders_faq',
  })
  return response?.data
}
