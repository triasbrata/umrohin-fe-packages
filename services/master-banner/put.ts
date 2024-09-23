import { HttpBaseResponseMetaSchema, httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const BannerUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type BannerUpdateItemParams = z.infer<typeof BannerUpdateItemParamsSchema>

export const BannerUpdateItemBodySchema = zfd.formData({
  name: zfd.text(),
  description: zfd.text(),
  image: z.union([zfd.file(), z.string()]),
  title: zfd.text(),
  link: zfd.text(),
})
export type BannerUpdateItemBody = z.infer<typeof BannerUpdateItemBodySchema>

export const BannerUpdateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  title: z.string(),
  link: z.string(),
})
export type BannerUpdateItemResult = z.infer<typeof BannerUpdateItemResultSchema>

export const BannerUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(BannerUpdateItemResultSchema)
export type BannerUpdateItemResponse = z.infer<typeof BannerUpdateItemResponseSchema>

export const updateItem = async <ResponseType = BannerUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: BannerUpdateItemParams
  body: BannerUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'put',
    url: `/v1/banners/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

// Activation
export const BannerActivationItemParamsSchema = z.object({ id: z.string().optional() })
export type BannerActivationItemParams = z.infer<typeof BannerActivationItemParamsSchema>

export const BannerActivationItemBodySchema = zfd.formData({ is_active: z.boolean() })
export type BannerActivationItemBody = z.infer<typeof BannerActivationItemBodySchema>

export const BannerActivationItemResponseSchema = HttpBaseResponseMetaSchema
export type BannerActivationItemResponse = z.infer<typeof BannerActivationItemResponseSchema>

export const activateItem = async <ResponseType = BannerActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: BannerActivationItemParams
  body: BannerActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/banners/${id}`,
  })
  return response?.data
}
