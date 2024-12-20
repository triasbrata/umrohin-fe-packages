import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const CSPenempatanListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_active: z.boolean().optional(),
})
export type CSPenempatanListParams = z.infer<typeof CSPenempatanListParamsSchema>

export const CSPenempatanListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  text_message: z.string(),
  is_active: z.boolean(),
  total_interaction: z.string().nullable(),
  cs_count: z.string(),
})

export type CSPenempatanListItem = z.infer<typeof CSPenempatanListItemSchema>

export const CSPenempatanListResponseSchema = httpGetListResponseSchemaBuilder(CSPenempatanListItemSchema)
export type CSPenempatanListResponse = z.infer<typeof CSPenempatanListResponseSchema>

export const getList = async <ResponseType = CSPenempatanListResponse>({
  params,
  options,
}: {
  params: CSPenempatanListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/wa_positions',
  })
  return response?.data
}
