import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const PackageHotelVendorDeleteItemParamsSchema = z.object({ id: z.string().optional() })
export type PackageHotelVendorDeleteItemParams = z.infer<typeof PackageHotelVendorDeleteItemParamsSchema>

export const PackageHotelVendorDeleteItemResponseSchema = HttpBaseResponseMetaSchema
export type PackageHotelVendorDeleteItemResponse = z.infer<typeof PackageHotelVendorDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = PackageHotelVendorDeleteItemResponse>({
  params,
  options,
}: {
  params: PackageHotelVendorDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `/v1/hotel_vendor/${id}`,
  })
  return response?.data
}
