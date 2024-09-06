import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const InternalUserListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
})
export type InternalUserRoleListParams = z.infer<typeof InternalUserListParamsSchema>

export const InternalUserRoleListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  display_name: z.string(),
  is_default: z.boolean(),
})

export type InternalUserRoleListItem = z.infer<typeof InternalUserRoleListItemSchema>

export const InternalUserRoleListResponseSchema = httpGetListResponseSchemaBuilder(InternalUserRoleListItemSchema)
export type InternalUserRoleListResponse = z.infer<typeof InternalUserRoleListResponseSchema>

export const getList = async <ResponseType = InternalUserRoleListResponse>({
  params,
  options,
}: {
  params: InternalUserRoleListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/roles',
  })
  return response?.data
}
