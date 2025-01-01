import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterTokohListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
  export_data: z.boolean().optional(),
})
export type MasterTokohListParams = z.infer<typeof MasterTokohListParamsSchema>

export const MasterTokohListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  featured_image: z.string().nullable(),
  short_description: z.string().nullable(),
  year_experience: z.number().nullable(),
  status: z.string().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  type: z.string(),
  description: z.string().nullable().optional(),
  biografi: z.string().nullable().optional(),
  instagram: z.string().nullable(),
  tiktok: z.string().nullable(),
  youtube: z.string().nullable(),
  facebook: z.string().nullable(),
  twitter: z.string().nullable(),
  website: z.string().nullable(),
  testimonials: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
      })
    )
    .optional()
    .nullable(),
  media: z
    .array(
      z.object({
        title: z.string(),
        image: z.string(),
        link: z.string(),
      })
    )
    .optional()
    .nullable(),
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
