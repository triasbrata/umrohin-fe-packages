import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterTourLocationDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterTourLocationDeleteItemParams = z.infer<typeof MasterTourLocationDeleteItemParamsSchema>

export const MasterTourLocationDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterTourLocationDeleteItemResponse = z.infer<typeof MasterTourLocationDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = MasterTourLocationDeleteItemResponse>({
  params,
  options,
}: {
  params: MasterTourLocationDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/object_wisata/${id}`,
  })
  return response?.data
}
