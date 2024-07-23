import { httpGetDetailResponseSchemaBuilder, HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const MasterProviderUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterProviderUpdateItemParams = z.infer<typeof MasterProviderUpdateItemParamsSchema>

export const MasterProviderUpdateItemBodySchema = zfd.formData({
  name: zfd.text(),
  pic_name: zfd.text(),
  pic_phone: zfd.text(),
  address: zfd.text(),
  type: zfd.text(),
})
export type MasterProviderUpdateItemBody = z.infer<typeof MasterProviderUpdateItemBodySchema>

export const MasterProviderUpdateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  pic_name: z.string(),
  pic_phone: z.string(),
  address: z.string(),
  type: z.string(),
})
export type MasterProviderUpdateItemResult = z.infer<typeof MasterProviderUpdateItemResultSchema>

export const MasterProviderUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterProviderUpdateItemResultSchema
)
export type MasterProviderUpdateItemResponse = z.infer<typeof MasterProviderUpdateItemResponseSchema>

export const updateItem = async <ResponseType = MasterProviderUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterProviderUpdateItemParams
  body: MasterProviderUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'put',
    url: `/v1/ticket_providers/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

// Activation
export const MasterProviderActivationItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterProviderActivationItemParams = z.infer<typeof MasterProviderActivationItemParamsSchema>

export const MasterProviderActivationItemBodySchema = zfd.formData({ is_active: z.boolean() })
export type MasterProviderActivationItemBody = z.infer<typeof MasterProviderActivationItemBodySchema>

export const MasterProviderActivationItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterProviderActivationItemResponse = z.infer<typeof MasterProviderActivationItemResponseSchema>

export const activateItem = async <ResponseType = MasterProviderActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterProviderActivationItemParams
  body: MasterProviderActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/actions_up/ticket_providers/${id}`,
  })
  return response?.data
}
