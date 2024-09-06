import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterLanguageListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
})
export type MasterLanguageListParams = z.infer<typeof MasterLanguageListParamsSchema>

export const MasterLanguageListItemSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  short_name: z.string(),
  is_active: z.string(),
})
export type MasterLanguageListItem = z.infer<typeof MasterLanguageListItemSchema>

export const MasterLanguageListResponseSchema = httpGetListResponseSchemaBuilder(MasterLanguageListItemSchema)
export type MasterLanguageListResponse = z.infer<typeof MasterLanguageListResponseSchema>

export const getList = async <ResponseType = MasterLanguageListResponse>({
  params,
  options,
}: {
  params: MasterLanguageListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/languages',
  })
  return response?.data
}
