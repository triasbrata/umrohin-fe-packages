import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/group-member`

export const MitraGroupMemberCreateItemBodySchema = zfd.formData({
  marker_info: zfd.text(),
  small_group_id: z.number(),
  umroh_group_id: z.number(),
  userId: z.array(z.number()),
  member_status: z.number(),
})

export type MitraGroupMemberCreateItemBody = z.infer<typeof MitraGroupMemberCreateItemBodySchema>

export const MitraGroupMemberCreateItemResultSchema = z.object({
  umroh_group_id: z.string(),
  name: z.string(),
  user_id: z.string(),
  user_name: z.string(),
  member_status: z.string(),
  marker_info: z.string().optional(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]).optional(),
})

export type MitraGroupMemberCreateItemResult = z.infer<typeof MitraGroupMemberCreateItemResultSchema>

export const MitraGroupMemberCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MitraGroupMemberCreateItemResultSchema
)

export type MitraGroupMemberCreateItemResponse = z.infer<typeof MitraGroupMemberCreateItemResponseSchema>

export const createItem = async <ResponseType = MitraGroupMemberCreateItemResponse>({
  body,
  options,
}: {
  body: MitraGroupMemberCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: endpointUrl,
  })
  return response?.data
}
