import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterFigureListParamsSchema = z.object({
  search: z.string().nullable().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type MasterFigureListParams = z.infer<typeof MasterFigureListParamsSchema>

export const MasterFigureListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  short_description: z.string(),
  description: z.string().optional(),
  year_experience: z.number(),
  price: z.number(),
  discount: z.number(),
  status: z.string(),
  featured_image: z.string(),
  images: z.any(),
  skills: z.string().array(),
  languages: z.string().array(),
  type: z.string(),
})
export type MasterFigureListItem = z.infer<typeof MasterFigureListItemSchema>

export const MasterFigureListResponseSchema = httpGetListResponseSchemaBuilder(MasterFigureListItemSchema)
export type MasterFigureListResponse = z.infer<typeof MasterFigureListResponseSchema>

export const getList = async <ResponseType = MasterFigureListResponse>({
  params,
  options,
}: {
  params: MasterFigureListParams
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
