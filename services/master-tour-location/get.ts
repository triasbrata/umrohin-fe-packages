import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterTourLocationListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type MasterTourLocationListParams = z.infer<typeof MasterTourLocationListParamsSchema>

export const MasterTourLocationListItemSchema = z.object({
  id: z.string(),
  city_id: z.string().nullable(),
  name: z.string(),
  description: z.string(),
  image: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type MasterTourLocationListItem = z.infer<typeof MasterTourLocationListItemSchema>

export const MasterTourLocationListResponseSchema = httpGetListResponseSchemaBuilder(MasterTourLocationListItemSchema)
export type MasterTourLocationListResponse = z.infer<typeof MasterTourLocationListResponseSchema>

export const getList = async <ResponseType = MasterTourLocationListResponse>({
  params,
  options,
}: {
  params: MasterTourLocationListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/object_wisata',
  })
  return response?.data
}
