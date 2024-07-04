import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterFacilityDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterFacilityDeleteItemParams = z.infer<typeof MasterFacilityDeleteItemParamsSchema>

export const MasterFacilityDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterFacilityDeleteItemResponse = z.infer<typeof MasterFacilityDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = MasterFacilityDeleteItemResponse>({
  params,
  options,
}: {
  params: MasterFacilityDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/facilities/${id}`,
  })
  return response?.data
}
