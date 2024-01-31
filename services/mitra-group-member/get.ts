import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/group-member`

export const MitraGroupMemberListParamsSchema = z.object({
  id: z.number(),
  page: z.number().optional(),
  page_size: z.number().optional(),
  name: z.string().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type MitraGroupMemberListParams = z.infer<typeof MitraGroupMemberListParamsSchema>

export const MitraGroupMemberListItemSchema = z.object({
  umroh_group_member_id: z.string().optional(),
  umroh_group_id: z.string().optional(),
  name: z.string(),
  user_id: z.string(),
  user_name: z.string(),
  member_status: z.string(),
  marker_info: z.string().optional(),
  small_group_id: z.number(),
  status: z.union([z.literal(0), z.literal(1), z.literal(-1), z.boolean()]).optional(),
})

export type MitraGroupMemberListItem = z.infer<typeof MitraGroupMemberListItemSchema>

export const MitraGroupMemberListResponseSchema = httpGetListResponseSchemaBuilder(MitraGroupMemberListItemSchema)

export type MitraGroupMemberListResponse = z.infer<typeof MitraGroupMemberListResponseSchema>

export const getList = async <ResponseType = MitraGroupMemberListResponse>({
  params,
  options,
}: {
  params: MitraGroupMemberListParams
  options?: AxiosRequestConfig
}) => {
  const { id, ...others } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    params: others,
    ...options,
    method: 'get',
    url: `${endpointUrl}/${id}`,
  })
  return response?.data
}
