import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const StatusHistoryListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  order: z.number(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type StatusHistoryListItem = z.infer<typeof StatusHistoryListItemSchema>

export const StatusHistoryListResponseSchema = httpGetListResponseSchemaBuilder(StatusHistoryListItemSchema)
export type StatusHistoryListResponse = z.infer<typeof StatusHistoryListResponseSchema>

export const getList = async <ResponseType = StatusHistoryListResponse>() => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    method: 'get',
    url: '/v1/status_history?export_data=true&is_active=true',
  })

  return response?.data
}
