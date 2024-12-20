import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const CSPenempatanDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type CSPenempatanDeleteItemParams = z.infer<typeof CSPenempatanDeleteItemParamsSchema>

export const CSPenempatanDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type CSPenempatanDeleteItemResponse = z.infer<typeof CSPenempatanDeleteItemResponseSchema>

export const deleteCSPenempatan = async <ResponseType = CSPenempatanDeleteItemResponse>({
  params,
  options,
}: {
  params: CSPenempatanDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/wa_positions/${id}`,
  })
  return response?.data
}
