import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const BenefitDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type BenefitDeleteItemParams = z.infer<typeof BenefitDeleteItemParamsSchema>

export const BenefitDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type BenefitDeleteItemResponse = z.infer<typeof BenefitDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = BenefitDeleteItemResponse>({
  params,
  options,
}: {
  params: BenefitDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/leaders_benefits/${id}`,
  })
  return response?.data
}
