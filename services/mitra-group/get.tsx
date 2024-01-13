import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/group`

export const MitraGroupListParamsSchema = z.object({
  page: z.number().optional(),
  page_size: z.number().optional(),
  name: z.string().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type MitraGroupListParams = z.infer<typeof MitraGroupListParamsSchema>

export const MitraGroupListItemSchema = z.object({
  group_id: z.string(),
  name: z.string(),
  tour_leader_total: z.number(),
  tour_guide_total: z.number(),
  tour_member_total: z.number(),
  desc: z.string().optional(),
  group_total: z.number(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MitraGroupListItem = z.infer<typeof MitraGroupListItemSchema>

export const MitraGroupListResponseSchema = httpGetListResponseSchemaBuilder(MitraGroupListItemSchema)

export type MitraGroupListResponse = z.infer<typeof MitraGroupListResponseSchema>

export const MitraGroupDetailListItemSchema = z.object({
  group_member_id: z.string(),
  name: z.string(),
  role: z.string(),
  group: z.number(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MitraGroupDetailListItem = z.infer<typeof MitraGroupDetailListItemSchema>

export const MitraGroupDetailListResponseSchema = httpGetListResponseSchemaBuilder(MitraGroupDetailListItemSchema)

export type MitraGroupDetailListResponse = z.infer<typeof MitraGroupDetailListResponseSchema>

export const getList = async <ResponseType = MitraGroupListResponse,>({
  params,
  options,
}: {
  params: MitraGroupListParams
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
