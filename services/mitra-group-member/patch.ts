import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/group-member`

export const MitraGroupMemberUpdateItemParamsSchema = z.object({ id: z.number() })

export type MitraGroupMemberUpdateItemParams = z.infer<typeof MitraGroupMemberUpdateItemParamsSchema>

export const MitraGroupMemberUpdateItemBodySchema = zfd.formData({
  marker_info: zfd.text(),
  small_group_id: z.number(),
  umroh_group_id: z.number(),
  userId: z.array(z.number()),
  member_status: z.number(),
})

export type MitraGroupMemberUpdateItemBody = z.infer<typeof MitraGroupMemberUpdateItemBodySchema>

export const MitraGroupMemberUpdateItemResultSchema = z.object({
  umroh_group_member_id: z.string().optional(),
  umroh_group_id: z.string(),
  name: z.string(),
  user_id: z.string(),
  user_name: z.string(),
  member_status: z.string(),
  marker_info: z.string().optional(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]).optional(),
})

export type MitraGroupMemberUpdateItemResult = z.infer<typeof MitraGroupMemberUpdateItemResultSchema>

export const MitraGroupMemberUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MitraGroupMemberUpdateItemResultSchema
)

export type MitraGroupMemberUpdateItemResponse = z.infer<typeof MitraGroupMemberUpdateItemResponseSchema>

export const updateItem = async <ResponseType = MitraGroupMemberUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: MitraGroupMemberUpdateItemParams
  body: MitraGroupMemberUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `${endpointUrl}/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

export const MitraGroupMemberActivationItemParamsSchema = z.object({ id: z.number() })

export type MitraGroupMemberActivationItemParams = z.infer<typeof MitraGroupMemberActivationItemParamsSchema>

export const MitraGroupMemberActivationItemBodySchema = z.object({
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MitraGroupMemberActivationItemBody = z.infer<typeof MitraGroupMemberActivationItemBodySchema>

export const MitraGroupMemberActivationItemResultSchema = z.object({
  umroh_group_member_id: z.string().optional(),
  umroh_group_id: z.string(),
  name: z.string(),
  user_id: z.string(),
  user_name: z.string(),
  member_status: z.string(),
  marker_info: z.string().optional(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]).optional(),
})

export type MitraGroupMemberActivationItemResult = z.infer<typeof MitraGroupMemberActivationItemResultSchema>

export const MitraGroupMemberActivationItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MitraGroupMemberActivationItemResultSchema
)

export type MitraGroupMemberActivationItemResponse = z.infer<typeof MitraGroupMemberActivationItemResponseSchema>

export const activationItem = async <ResponseType = MitraGroupMemberActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: MitraGroupMemberActivationItemParams
  body: MitraGroupMemberActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'patch',
    url: `${endpointUrl}/${id}/status`,
  })
  return response?.data
}
