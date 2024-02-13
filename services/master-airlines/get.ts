import { common } from '@apps/packages/lib/constants'
import { httpGetListHighlightResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/airlines`

export const MasterAirlinesListParamsSchema = z.object({
  page: z.number().optional(),
  page_size: z.number().optional(),
  name: z.string().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type MasterAirlinesListParams = z.infer<typeof MasterAirlinesListParamsSchema>

export const MasterAirlinesListItemSchema = z.object({
  airlines_id: z.string(),
  name: z.string(),
  code: z.string(),
  is_highlight: z.boolean(),
  icon: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MasterAirlinesListItem = z.infer<typeof MasterAirlinesListItemSchema>

export const MasterAirlinesListResponseSchema = httpGetListHighlightResponseSchemaBuilder(MasterAirlinesListItemSchema)

export type MasterAirlinesListResponse = z.infer<typeof MasterAirlinesListResponseSchema>

export const getList = async <ResponseType = MasterAirlinesListResponse>({
  params,
  options,
}: {
  params: MasterAirlinesListParams
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
