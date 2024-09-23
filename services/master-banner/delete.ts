import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const BannerDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type BannerDeleteItemParams = z.infer<typeof BannerDeleteItemParamsSchema>

export const BannerDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type BannerDeleteItemResponse = z.infer<typeof BannerDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = BannerDeleteItemResponse>({
  params,
  options,
}: {
  params: BannerDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/banners/${id}`,
  })
  return response?.data
}
