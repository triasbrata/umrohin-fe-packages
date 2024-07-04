import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const FigureCreateItemBodySchema = zfd.formData({
  name: zfd.text(),
  short_description: zfd.text(),
  description: zfd.text(),
  year_experience: zfd.text(),
  price: zfd.text(),
  discount: zfd.text(),
  status: zfd.text(),
  featured_image: zfd.file(),
  image: zfd.file(),
  skills: zfd.text(),
  languages: zfd.text(),
  type: zfd.text(),
})
export type FigureCreateItemBody = z.infer<typeof FigureCreateItemBodySchema>

export const FigureCreateItemResultSchema = z.object({
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
export type FigureCreateItemResult = z.infer<typeof FigureCreateItemResultSchema>

export const FigureCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(FigureCreateItemResultSchema)
export type FigureCreateItemResponse = z.infer<typeof FigureCreateItemResponseSchema>

export const createItem = async <ResponseType = FigureCreateItemResponse>({
  body,
  options,
}: {
  body: FigureCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    if (typeof value === 'object') formData.append(key, value)
    else formData.append(key, value.toString())
  })

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'post',
    url: '/v1/tokoh',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
