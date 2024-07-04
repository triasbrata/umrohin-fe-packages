import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const TourLeaderUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type TourLeaderUpdateItemParams = z.infer<typeof TourLeaderUpdateItemParamsSchema>

export const TourLeaderUpdateItemBodySchema = zfd.formData({
  name: zfd.text(),
  short_description: zfd.text(),
  description: zfd.text(),
  year_experience: zfd.text(),
  price: zfd.text(),
  discount: zfd.text(),
  status: zfd.text(),
  featured_image: z.union([zfd.file(), z.string()]),
  image: z.union([zfd.file(), z.string()]),
  skills: zfd.text(),
  languages: zfd.text(),
  type: zfd.text(),
})
export type TourLeaderUpdateItemBody = z.infer<typeof TourLeaderUpdateItemBodySchema>

export const TourLeaderUpdateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  short_description: z.string(),
  description: z.string().optional(),
  year_experience: z.number(),
  price: z.number(),
  discount: z.number().optional(),
  status: z.string(),
  featured_image: z.string(),
  image: z.string(),
  skills: z.string().array(),
  languages: z.string().array(),
  type: z.string(),
})
export type TourLeaderUpdateItemResult = z.infer<typeof TourLeaderUpdateItemResultSchema>

export const TourLeaderUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(TourLeaderUpdateItemResultSchema)
export type TourLeaderUpdateItemResponse = z.infer<typeof TourLeaderUpdateItemResponseSchema>

export const updateItem = async <ResponseType = TourLeaderUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: TourLeaderUpdateItemParams
  body: TourLeaderUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    if (typeof value === 'object') formData.append(key, value)
    else formData.append(key, value.toString())
  })
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'put',
    url: `/v1/leaders/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
