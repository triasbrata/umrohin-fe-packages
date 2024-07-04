import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const TourLeaderDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type TourLeaderDeleteItemParams = z.infer<typeof TourLeaderDeleteItemParamsSchema>

export const TourLeaderDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type TourLeaderDeleteItemResponse = z.infer<typeof TourLeaderDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = TourLeaderDeleteItemResponse>({
  params,
  options,
}: {
  params: TourLeaderDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/leaders/${id}`,
  })
  return response?.data
}
