import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const FigureUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type FigureUpdateItemParams = z.infer<typeof FigureUpdateItemParamsSchema>

export const FigureUpdateItemBodySchema = zfd.formData({
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
export type FigureUpdateItemBody = z.infer<typeof FigureUpdateItemBodySchema>

export const FigureUpdateItemResultSchema = z.object({
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
export type FigureUpdateItemResult = z.infer<typeof FigureUpdateItemResultSchema>

export const FigureUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(FigureUpdateItemResultSchema)
export type FigureUpdateItemResponse = z.infer<typeof FigureUpdateItemResponseSchema>

export const updateItem = async <ResponseType = FigureUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: FigureUpdateItemParams
  body: FigureUpdateItemBody
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
    url: `/v1/tokoh/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
