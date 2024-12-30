import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const FAQDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type FAQDeleteItemParams = z.infer<typeof FAQDeleteItemParamsSchema>

export const FAQDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type FAQDeleteItemResponse = z.infer<typeof FAQDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = FAQDeleteItemResponse>({
  params,
  options,
}: {
  params: FAQDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/leaders_faq/${id}`,
  })
  return response?.data
}
