import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const ObjekWisataListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  export_data: z.boolean().optional(),
  is_active: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  order_by: z.string().optional(),
  sort_by: z.enum(['asc', 'desc']).optional(),
})
export type ObjekWisataListParams = z.infer<typeof ObjekWisataListParamsSchema>

export const ObjekWisataListItemSchema = z.object({
  id: z.string(),
  city_id: z.string().nullable(),
  name: z.string().nullable(),
  image: z.string().nullable(),
  description: z.string().nullable(),
  is_active: z.boolean().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  is_deleted: z.boolean().nullable(),
  order_no: z.number().nullable(),
})
export type ObjekWisataListItem = z.infer<typeof ObjekWisataListItemSchema>

export const ObjekWisataListResponseSchema = httpGetListResponseSchemaBuilder(ObjekWisataListItemSchema)
export type ObjekWisataListResponse = z.infer<typeof ObjekWisataListResponseSchema>

export const getList = async <ResponseType = ObjekWisataListResponse>({
  params,
  options,
}: {
  params: ObjekWisataListParams
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
