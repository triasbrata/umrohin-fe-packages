import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterSkillListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
})
export type MasterSkillListParams = z.infer<typeof MasterSkillListParamsSchema>

export const MasterSkillListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  is_active: z.string(),
})
export type MasterSkillListItem = z.infer<typeof MasterSkillListItemSchema>

export const MasterSkillListResponseSchema = httpGetListResponseSchemaBuilder(MasterSkillListItemSchema)
export type MasterSkillListResponse = z.infer<typeof MasterSkillListResponseSchema>

export const getList = async <ResponseType = MasterSkillListResponse>({
  params,
  options,
}: {
  params: MasterSkillListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/skills',
  })
  return response?.data
}
