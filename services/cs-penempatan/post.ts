import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const CSPenempatanCreateItemBodySchema = z.object({
  name: z.string(),
  code: z.string(),
  text_message: z.string(),
})

export type CSPenempatanCreateItemBody = z.infer<typeof CSPenempatanCreateItemBodySchema>

export const CSPenempatanCreateItemResultSchema = z.object({
  name: z.string(),
  code: z.string(),
  text_message: z.string(),
})
export type CSPenempatanCreateItemResult = z.infer<typeof CSPenempatanCreateItemResultSchema>

export const CSPenempatanCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  CSPenempatanCreateItemResultSchema
)
export type CSPenempatanCreateItemResponse = z.infer<typeof CSPenempatanCreateItemResponseSchema>

export const createCSPenempatanItem = async <ResponseType = CSPenempatanCreateItemResponse>({
  body,
  options,
}: {
  body: CSPenempatanCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: '/v1/wa_positions',
  })
  return response?.data
}
