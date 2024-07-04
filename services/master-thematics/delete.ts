import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const ThematicDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type ThematicDeleteItemParams = z.infer<typeof ThematicDeleteItemParamsSchema>

export const ThematicDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type ThematicDeleteItemResponse = z.infer<typeof ThematicDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = ThematicDeleteItemResponse>({
  params,
  options,
}: {
  params: ThematicDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/tema/${id}`,
  })
  return response?.data
}
