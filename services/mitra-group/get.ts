import { common } from '@apps/packages/lib/constants'
import {
  httpGetDetailResponseSchemaBuilder,
  httpGetListResponseSchemaBuilder,
} from '@apps/packages/services/BaseResponse'
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
  umroh_group_id: z.string(),
  name: z.string(),
  tour_leader_total: z.number().optional(),
  tour_guide_total: z.number().optional(),
  tour_member_total: z.number().optional(),
  group_total: z.number().optional(),
  desc: z.string().optional().optional(),
  file: z.string().optional().optional(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MitraGroupListItem = z.infer<typeof MitraGroupListItemSchema>

export const MitraGroupListResponseSchema = httpGetListResponseSchemaBuilder(MitraGroupListItemSchema)

export type MitraGroupListResponse = z.infer<typeof MitraGroupListResponseSchema>

export const MitraGroupDetailListItemSchema = z.object({
  umroh_group_member_id: z.string(),
  umroh_group_id: z.string(),
  user_id: z.string(),
  name: z.string().optional(),
  role: z.string().optional(),
  marker_info: z.string().optional(),
  small_group_id: z.number(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MitraGroupDetailListItem = z.infer<typeof MitraGroupDetailListItemSchema>

export const MitraGroupDetailListResponseSchema = httpGetListResponseSchemaBuilder(MitraGroupDetailListItemSchema)

export type MitraGroupDetailListResponse = z.infer<typeof MitraGroupDetailListResponseSchema>

export const getList = async <ResponseType = MitraGroupListResponse>({
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

export const MitraGroupDetailParamsSchema = z.object({ id: z.number() })

export type MitraGroupDetailParams = z.infer<typeof MitraGroupDetailParamsSchema>

export const MitraGroupDetailItemSchema = z.object({
  umroh_group_id: z.string(),
  name: z.string(),
  tour_leader_total: z.number().optional(),
  tour_guide_total: z.number().optional(),
  tour_member_total: z.number().optional(),
  group_total: z.number().optional(),
  desc: z.string().optional().optional(),
  file: z.string().optional().optional(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MitraGroupDetailItem = z.infer<typeof MitraGroupDetailItemSchema>

export const MitraGroupDetailResponseSchema = httpGetDetailResponseSchemaBuilder(MitraGroupDetailItemSchema)

export type MitraGroupDetailResponse = z.infer<typeof MitraGroupDetailResponseSchema>

export const getDetail = async <ResponseType = MitraGroupDetailResponse>({
  params,
  options,
}: {
  params: MitraGroupDetailParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `${endpointUrl}/${id}`,
  })
  return response?.data
}
