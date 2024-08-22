import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const TokohDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type TokohDeleteItemParams = z.infer<typeof TokohDeleteItemParamsSchema>

export const TokohDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type TokohDeleteItemResponse = z.infer<typeof TokohDeleteItemResponseSchema>

export const deleteTokoh = async <ResponseType = TokohDeleteItemResponse>({
  params,
  options,
}: {
  params: TokohDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/tokoh/${id}`,
  })
  return response?.data
}
