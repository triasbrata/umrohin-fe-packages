import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const TokohCreateItemBodySchema = zfd.formData({
  name: zfd.text(),
  type: zfd.text(),
  featured_image: zfd.file(),
  description: zfd.text(),
  short_description: zfd.text(),
  instagram: zfd.text(),
  tiktok: zfd.text(),
  youtube: zfd.text(),
  facebook: zfd.text(),
  twitter: zfd.text(),
  website: zfd.text(),
  leaders_testimonials: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
      })
    )
    .optional()
    .nullable(),
  leaders_media: z
    .array(
      z.object({
        title: z.string(),
        image: z.union([zfd.file(), z.any()]),
        link: z.string(),
        thumbnail: z.any(),
      })
    )
    .optional()
    .nullable(),
})

export type TokohCreateItemBody = z.infer<typeof TokohCreateItemBodySchema>

export const TokohCreateItemResultSchema = z.object({
  name: z.string().nullable(),
  type: z.string().nullable(),
  featured_image: z.any().nullable(),
  description: z.string().nullable(),
  short_description: z.string().nullable(),
  instagram: z.string().nullable(),
  tiktok: z.string().nullable(),
  youtube: z.string().nullable(),
  facebook: z.string().nullable(),
  twitter: z.string().nullable(),
  website: z.string().nullable(),
  leaders_testimonials: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
      })
    )
    .optional()
    .nullable(),
  leaders_media: z
    .array(
      z.object({
        title: z.string(),
        image: z.any(),
        link: z.string(),
      })
    )
    .optional()
    .nullable(),
})
export type TokohCreateItemResult = z.infer<typeof TokohCreateItemResultSchema>

export const TokohCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(TokohCreateItemResultSchema)
export type TokohCreateItemResponse = z.infer<typeof TokohCreateItemResponseSchema>

export const createTokohItem = async <ResponseType = TokohCreateItemResponse>({
  body,
  options,
}: {
  body: TokohCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: '/v1/tokoh',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
