import { HttpBaseResponseMetaSchema, httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const ThematicUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type ThematicUpdateItemParams = z.infer<typeof ThematicUpdateItemParamsSchema>

export const ThematicUpdateItemBodySchema = zfd.formData({
  name: zfd.text(),
  description: zfd.text(),
  image: z.union([zfd.file(), z.string()]),
})
export type ThematicUpdateItemBody = z.infer<typeof ThematicUpdateItemBodySchema>

export const ThematicUpdateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
})
export type ThematicUpdateItemResult = z.infer<typeof ThematicUpdateItemResultSchema>

export const ThematicUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(ThematicUpdateItemResultSchema)
export type ThematicUpdateItemResponse = z.infer<typeof ThematicUpdateItemResponseSchema>

export const updateItem = async <ResponseType = ThematicUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: ThematicUpdateItemParams
  body: ThematicUpdateItemBody
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
    url: `/v1/tema/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

// Activation
export const ThematicActivationItemParamsSchema = z.object({ id: z.string().optional() })
export type ThematicActivationItemParams = z.infer<typeof ThematicActivationItemParamsSchema>

export const ThematicActivationItemBodySchema = zfd.formData({ is_active: z.boolean() })
export type ThematicActivationItemBody = z.infer<typeof ThematicActivationItemBodySchema>

export const ThematicActivationItemResponseSchema = HttpBaseResponseMetaSchema
export type ThematicActivationItemResponse = z.infer<typeof ThematicActivationItemResponseSchema>

export const activateItem = async <ResponseType = ThematicActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: ThematicActivationItemParams
  body: ThematicActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/tema/${id}`,
  })
  return response?.data
}
