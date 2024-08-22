import { HttpBaseResponseMetaSchema, httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const TokohUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type TokohUpdateItemParams = z.infer<typeof TokohUpdateItemParamsSchema>

export const TokohUpdateItemBodySchema = zfd.formData({
  name: zfd.text(),
  type: zfd.text(),
  featured_image: z.union([zfd.file(), z.string()]),
})
export type TokohUpdateItemBody = z.infer<typeof TokohUpdateItemBodySchema>

export const TokohUpdateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  featured_image: z.string(),
  updated_at: z.string(),
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

// ACTIVATION TOKOH
export const MasterTokohActivationItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterTokohActivationItemParams = z.infer<typeof MasterTokohActivationItemParamsSchema>

export const MasterTokohActivationItemBodySchema = zfd.formData({ status: z.string() })
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
