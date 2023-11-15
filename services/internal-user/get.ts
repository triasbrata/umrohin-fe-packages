import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/user`

export const InternalUserListParamsSchema = z.object({
  page: z.number().optional(),
  page_size: z.number().optional(),
  name: z.string().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type InternalUserListParams = z.infer<typeof InternalUserListParamsSchema>

export const InternalUserListItemSchema = z.object({
  user_id: z.string(),
  name: z.string(),
  email: z.string().nullable(),
  phone_number: z.string().nullable(),
  status: z.union([z.literal(0), z.literal(1)]),
  has_password: z.boolean(),
  roles: z.array(z.string()),
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
    url: endpointUrl,
  })
  return response?.data
}
