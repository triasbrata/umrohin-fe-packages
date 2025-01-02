import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterTourLeaderListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
  export_data: z.boolean().optional(),
  status: z.string().optional(),
  is_active: z.boolean().optional(),
  sort_by: z.string().optional(),
  order_by: z.string().optional(),
})
export type MasterTourLeaderListParams = z.infer<typeof MasterTourLeaderListParamsSchema>

export const MasterTourLeaderListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  short_description: z.string().nullable(),
  description: z.string().nullable(),
  year_experience: z.number().nullable(),
  price: z.string().nullable(),
  discount: z.string().nullable(),
  status: z.string().nullable(),
  featured_image: z.string(),
  images: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
    })
  ),
  skills: z.array(z.string()).nullable(),
  languages: z.array(z.string()).nullable(),
  type: z.string().nullable(),
  products: z.array(z.any()).nullable(),
})

export type MasterTourLeaderListItem = z.infer<typeof MasterTourLeaderListItemSchema>

export const MasterTourLeaderListResponseSchema = httpGetListResponseSchemaBuilder(MasterTourLeaderListItemSchema)
export type MasterTourLeaderListResponse = z.infer<typeof MasterTourLeaderListResponseSchema>

export const getList = async <ResponseType = MasterTourLeaderListResponse>({
  params,
  options,
}: {
  params: MasterTourLeaderListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/leaders',
  })
  return response?.data
}
