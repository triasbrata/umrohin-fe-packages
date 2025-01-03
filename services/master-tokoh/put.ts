import { HttpBaseResponseMetaSchema, httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const TokohUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type TokohUpdateItemParams = z.infer<typeof TokohUpdateItemParamsSchema>

export const TokohUpdateItemBodySchema = z.object({
  name: z.string(),
  type: z.string(),
  featured_image: z.union([z.any(), z.string()]),
  description_html: z.string(),
  short_html: z.string(),
  instagram: z.string(),
  tiktok: z.string(),
  youtube: z.string(),
  facebook: z.string(),
  twitter: z.string(),
  website: z.string(),
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
        image: z.string(),
        link: z.string(),
        thumbnail: z.any(),
      })
    )
    .optional()
    .nullable(),
})
export type TokohUpdateItemBody = z.infer<typeof TokohUpdateItemBodySchema>

export const TokohUpdateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  featured_image: z.any(),
  description: z.string(),
  short_description: z.string(),
  instagram: z.string(),
  tiktok: z.string(),
  youtube: z.string(),
  facebook: z.string(),
  twitter: z.string(),
  website: z.string(),
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
        image: z.string(),
        link: z.string(),
        thumbnail: z.any(),
      })
    )
    .optional()
    .nullable(),
})
export type TokohUpdateItemResult = z.infer<typeof TokohUpdateItemResultSchema>

export const TokohUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(TokohUpdateItemResultSchema)
export type TokohUpdateItemResponse = z.infer<typeof TokohUpdateItemResponseSchema>

export const updateItem = async <ResponseType = TokohUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: TokohUpdateItemParams
  body: TokohUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/tokoh/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

// ACTIVATION TOKOH
export const MasterTokohActivationItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterTokohActivationItemParams = z.infer<typeof MasterTokohActivationItemParamsSchema>

export const MasterTokohActivationItemBodySchema = z.object({ status: z.string() })
export type MasterTokohActivationItemBody = z.infer<typeof MasterTokohActivationItemBodySchema>

export const MasterTokohActivationItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterTokohActivationItemResponse = z.infer<typeof MasterTokohActivationItemResponseSchema>

export const activateItem = async <ResponseType = MasterTokohActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterTokohActivationItemParams
  body: MasterTokohActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/tokoh/${id}`,
  })
  return response?.data
}
