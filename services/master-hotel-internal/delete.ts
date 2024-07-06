import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterHotelInternalDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterHotelInternalDeleteItemParams = z.infer<typeof MasterHotelInternalDeleteItemParamsSchema>

export const MasterHotelInternalDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterHotelInternalDeleteItemResponse = z.infer<typeof MasterHotelInternalDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = MasterHotelInternalDeleteItemResponse>({
  params,
  options,
}: {
  params: MasterHotelInternalDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/hotel_internal/${id}`,
  })
  return response?.data
}
