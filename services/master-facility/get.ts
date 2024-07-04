import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterFacilityListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type MasterFacilityListParams = z.infer<typeof MasterFacilityListParamsSchema>

export const MasterFacilityListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
})
export type MasterFacilityListItem = z.infer<typeof MasterFacilityListItemSchema>

export const MasterFacilityListResponseSchema = httpGetListResponseSchemaBuilder(MasterFacilityListItemSchema)
export type MasterFacilityListResponse = z.infer<typeof MasterFacilityListResponseSchema>

export const getList = async <ResponseType = MasterFacilityListResponse>({
  params,
  options,
}: {
  params: MasterFacilityListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/facilities',
  })
  return response?.data
}
