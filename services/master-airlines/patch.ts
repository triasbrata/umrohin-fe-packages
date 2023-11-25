import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/airlines`

export const AirlinesUpdateItemParamsSchema = z.object({ id: z.number() })

export type AirlinesUpdateItemParams = z.infer<typeof AirlinesUpdateItemParamsSchema>

export const AirlinesUpdateItemBodySchema = zfd.formData({
  name: zfd.text(),
  code: zfd.text(),
  is_highlight: z.boolean(),
  icon: z.union([zfd.file(), z.string()]),
})

export type AirlinesUpdateItemBody = z.infer<typeof AirlinesUpdateItemBodySchema>

export const AirlinesUpdateItemResultSchema = z.object({
  airlines_id: z.string(),
  name: z.string(),
  code: z.string(),
  is_highlight: z.boolean(),
  icon: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type AirlinesUpdateItemResult = z.infer<typeof AirlinesUpdateItemResultSchema>

export const AirlinesUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(AirlinesUpdateItemResultSchema)

export type AirlinesUpdateItemResponse = z.infer<typeof AirlinesUpdateItemResponseSchema>

export const updateItem = async <ResponseType = AirlinesUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: AirlinesUpdateItemParams
  body: AirlinesUpdateItemBody
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
    url: `${endpointUrl}/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

export const AirlinesActivationItemParamsSchema = z.object({ id: z.number() })

export type AirlinesActivationItemParams = z.infer<typeof AirlinesActivationItemParamsSchema>

export const AirlinesActivationItemBodySchema = z.object({
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type AirlinesActivationItemBody = z.infer<typeof AirlinesActivationItemBodySchema>

export const AirlinesActivationItemResultSchema = z.object({
  airlines_id: z.string(),
  name: z.string(),
  code: z.string().optional(),
  is_highlight: z.boolean(),
  icon: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type AirlinesActivationItemResult = z.infer<typeof AirlinesActivationItemResultSchema>

export const AirlinesActivationItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  AirlinesActivationItemResultSchema
)

export type AirlinesActivationItemResponse = z.infer<typeof AirlinesActivationItemResponseSchema>

export const activationItem = async <ResponseType = AirlinesActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: AirlinesActivationItemParams
  body: AirlinesActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'patch',
    url: `${endpointUrl}/${id}/status`,
  })
  return response?.data
}
