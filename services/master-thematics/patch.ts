import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { httpGetDetailResponseSchemaBuilder } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/thematic`

export const ThematicUpdateItemParamsSchema = z.object({ id: z.number() })

export type ThematicUpdateItemParams = z.infer<typeof ThematicUpdateItemParamsSchema>

export const ThematicUpdateItemBodySchema = zfd.formData({
  image: z.union([zfd.file(), z.string()]),
  name: zfd.text(),
  desc: zfd.text(),
})

export type ThematicUpdateItemBody = z.infer<typeof ThematicUpdateItemBodySchema>

export const ThematicUpdateItemResultSchema = z.object({
  thematic_id: z.string(),
  desc: z.string(),
  image: z.string(),
  name: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
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
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'patch',
    url: `${endpointUrl}/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

export const ThematicActivationItemParamsSchema = z.object({ id: z.number() })

export type ThematicActivationItemParams = z.infer<typeof ThematicActivationItemParamsSchema>

export const ThematicActivationItemBodySchema = z.object({
  status: z.union([z.literal(0), z.literal(1)]),
})

export type ThematicActivationItemBody = z.infer<typeof ThematicActivationItemBodySchema>

export const ThematicActivationItemResultSchema = z.object({
  thematic_id: z.string(),
  desc: z.string(),
  image: z.string(),
  name: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
})

export type ThematicActivationItemResult = z.infer<typeof ThematicActivationItemResultSchema>

export const ThematicActivationItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  ThematicActivationItemResultSchema
)

export type ThematicActivationItemResponse = z.infer<typeof ThematicActivationItemResponseSchema>

export const activationItem = async <ResponseType = ThematicActivationItemResponse>({
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
    method: 'patch',
    url: `${endpointUrl}/${id}/status`,
  })
  return response?.data
}
