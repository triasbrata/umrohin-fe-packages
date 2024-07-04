import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const FigureDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type FigureDeleteItemParams = z.infer<typeof FigureDeleteItemParamsSchema>

export const FigureDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type FigureDeleteItemResponse = z.infer<typeof FigureDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = FigureDeleteItemResponse>({
  params,
  options,
}: {
  params: FigureDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `v1/tokoh/${id}`,
  })
  return response?.data
}
