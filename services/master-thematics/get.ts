import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/thematic`

export const DummyThematicListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon_url: z.string(),
  is_highlight: z.boolean(),
  status: z.custom<0 | 1>(),
})

export type DummyThematicListItem = z.infer<typeof DummyThematicListItemSchema>

export const ThematicListParamsSchema = z.object({
  name: z.string().optional(),
  page: z.number().optional(),
  page_size: z.number().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type ThematicListParams = z.infer<typeof ThematicListParamsSchema>

export const ThematicListItemSchema = z.object({
  thematic_id: z.string(),
  desc: z.string(),
  image: z.string(),
  name: z.string(),
  status: z.number(),
  is_highlight: z.boolean().optional(),
})

export type ThematicListItem = z.infer<typeof ThematicListItemSchema>

export const ThematicListResponseSchema = httpGetListResponseSchemaBuilder(ThematicListItemSchema)

export type ThematicListResponse = z.infer<typeof ThematicListResponseSchema>

export const getList = async <ResponseType = ThematicListResponse>({
  params,
  options,
}: {
  params: ThematicListParams
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
