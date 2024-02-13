import { common } from '@apps/packages/lib/constants'
import { httpGetListHighlightResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/tour-leader`

export const MasterTourLeaderListParamsSchema = z.object({
  page: z.number().optional(),
  page_size: z.number().optional(),
  name: z.string().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type MasterTourLeaderListParams = z.infer<typeof MasterTourLeaderListParamsSchema>

export const MasterTourLeaderListItemSchema = z.object({
  tour_leader_id: z.string(),
  name: z.string(),
  desc: z.string().optional(),
  is_highlight: z.boolean(),
  thumbnail: z.string(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MasterTourLeaderListItem = z.infer<typeof MasterTourLeaderListItemSchema>

export const MasterTourLeaderListResponseSchema =
  httpGetListHighlightResponseSchemaBuilder(MasterTourLeaderListItemSchema)

export type MasterTourLeaderListResponse = z.infer<typeof MasterTourLeaderListResponseSchema>

export const getList = async <ResponseType = MasterTourLeaderListResponse>({
  params,
  options,
}: {
  params: MasterTourLeaderListParams
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
