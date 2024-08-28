import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterAirlinesListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  export_data: z.boolean().optional(),
})
export type MasterAirlinesListParams = z.infer<typeof MasterAirlinesListParamsSchema>

export const MasterAirlinesListItemSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  logo: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
})
export type MasterAirlinesListItem = z.infer<typeof MasterAirlinesListItemSchema>

export const MasterAirlinesListResponseSchema = httpGetListResponseSchemaBuilder(MasterAirlinesListItemSchema)
export type MasterAirlinesListResponse = z.infer<typeof MasterAirlinesListResponseSchema>

export const getList = async <ResponseType = MasterAirlinesListResponse>({
  params,
  options,
}: {
  params: MasterAirlinesListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/airlines',
  })
  return response?.data
}
