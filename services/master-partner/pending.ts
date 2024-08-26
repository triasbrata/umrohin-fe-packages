import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { apiCall } from '../apiService'
import { httpGetDetailResponseSchemaBuilder } from '../BaseResponse'
import { z } from 'zod'

export const PendingSchema = z.object({
  count: z.number(),
})
export type Pending = z.infer<typeof PendingSchema>

export const PendingResponseSchema = httpGetDetailResponseSchemaBuilder(PendingSchema)
export type PendingResponse = z.infer<typeof PendingResponseSchema>

export const getPending = async <ResponseType = PendingResponse>(options?: AxiosRequestConfig) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `/v1/actions_partners/pending_count`,
  })
  return response?.data
}
