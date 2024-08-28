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
  password: z.string().nullable().optional(),
  role_id: z.string(),
  status: z.string(),
  role: z.any(),
})

export const InternalUserListWithoutPasswordItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  // password: z.string().nullable(),
  role_id: z.string(),
  status: z.string(),
  role: z.any(),
})
export type InternalUserListItem = z.infer<typeof InternalUserListItemSchema>
export type InternalUserListWithoutPasswordItem = z.infer<typeof InternalUserListWithoutPasswordItemSchema>

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
