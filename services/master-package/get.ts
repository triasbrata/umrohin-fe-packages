import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterPackageListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type MasterPackageListParams = z.infer<typeof MasterPackageListParamsSchema>

export const MasterPackageListItemSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  name: z.string(),
  package_name: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
})
export type MasterPackageListItem = z.infer<typeof MasterPackageListItemSchema>

export const MasterPackageListResponseSchema = httpGetListResponseSchemaBuilder(MasterPackageListItemSchema)
export type MasterPackageListResponse = z.infer<typeof MasterPackageListResponseSchema>

export const getList = async <ResponseType = MasterPackageListResponse>({
  params,
  options,
}: {
  params: MasterPackageListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/products',
  })
  return response?.data
}
