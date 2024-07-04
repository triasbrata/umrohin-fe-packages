import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterPartnerDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterPartnerDeleteItemParams = z.infer<typeof MasterPartnerDeleteItemParamsSchema>

export const MasterPartnerDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterPartnerDeleteItemResponse = z.infer<typeof MasterPartnerDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = MasterPartnerDeleteItemResponse>({
  params,
  options,
}: {
  params: MasterPartnerDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/partners/${id}`,
  })
  return response?.data
}
