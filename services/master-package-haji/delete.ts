import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const PackageHajiDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type PackageHajiDeleteItemParams = z.infer<typeof PackageHajiDeleteItemParamsSchema>

export const PackageHajiDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type PackageHajiDeleteItemResponse = z.infer<typeof PackageHajiDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = PackageHajiDeleteItemResponse>({
  params,
  options,
}: {
  params: PackageHajiDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/products_haji/${id}`,
  })
  return response?.data
}
