import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const BannerListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  is_deleted: z.boolean().optional(),
})
export type BannerListParams = z.infer<typeof BannerListParamsSchema>

export const BannerListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  title: z.string(),
  link: z.string(),
  is_active: z.boolean(),
})
export type BannerListItem = z.infer<typeof BannerListItemSchema>

export const BannerListResponseSchema = httpGetListResponseSchemaBuilder(BannerListItemSchema)
export type BannerListResponse = z.infer<typeof BannerListResponseSchema>

export const getList = async <ResponseType = BannerListResponse>({
  params,
  options,
}: {
  params: BannerListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/banners',
  })
  return response?.data
}
