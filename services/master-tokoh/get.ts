import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterTokohListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type MasterTokohListParams = z.infer<typeof MasterTokohListParamsSchema>

export const MasterTokohListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  featured_image: z.string().nullable(),
  short_description: z.string().nullable(),
  description: z.string().nullable(),
  year_experience: z.number().nullable(),
  price: z
    .string()
    .nullable()
    .transform((val) => (val ? parseFloat(val) : null)),
  discount: z
    .string()
    .nullable()
    .transform((val) => (val ? parseFloat(val) : null)),
  status: z.string().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  type: z.string(),
})

export type MasterTokohListItem = z.infer<typeof MasterTokohListItemSchema>

export const MasterTokohListResponseSchema = httpGetListResponseSchemaBuilder(MasterTokohListItemSchema)
export type MasterTokohListResponse = z.infer<typeof MasterTokohListResponseSchema>

export const getList = async <ResponseType = MasterTokohListResponse>({
  params,
  options,
}: {
  params: MasterTokohListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/tokoh',
  })
  return response?.data
}
