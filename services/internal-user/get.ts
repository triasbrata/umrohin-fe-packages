import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const InternalUserListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type InternalUserListParams = z.infer<typeof InternalUserListParamsSchema>

export const InternalUserListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role_id: z.string(),
  status: z.string(),
})
export type InternalUserListItem = z.infer<typeof InternalUserListItemSchema>

export const InternalUserListResponseSchema = httpGetListResponseSchemaBuilder(InternalUserListItemSchema)
export type InternalUserListResponse = z.infer<typeof InternalUserListResponseSchema>

export const getList = async <ResponseType = InternalUserListResponse>({
  params,
  options,
}: {
  params: InternalUserListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/users_internal',
  })
  return response?.data
}
