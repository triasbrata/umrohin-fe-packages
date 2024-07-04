import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const PackageDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type PackageDeleteItemParams = z.infer<typeof PackageDeleteItemParamsSchema>

export const PackageDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type PackageDeleteItemResponse = z.infer<typeof PackageDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = PackageDeleteItemResponse>({
  params,
  options,
}: {
  params: PackageDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/products/${id}`,
  })
  return response?.data
}
