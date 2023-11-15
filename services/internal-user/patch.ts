import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/user`

export const InternalUserUpdateItemParamsSchema = z.object({ id: z.number() })

export type InternalUserUpdateItemParams = z.infer<typeof InternalUserUpdateItemParamsSchema>

export const InternalUserUpdateItemBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  roles: z.array(z.string()),
})

export type InternalUserUpdateItemBody = z.infer<typeof InternalUserUpdateItemBodySchema>

export const InternalUserUpdateItemResultSchema = z.object({
  user_id: z.string(),
  name: z.string(),
  email: z.string(),
  phone_number: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
  has_password: z.boolean(),
  roles: z.array(z.string()),
})

export type InternalUserUpdateItemResult = z.infer<typeof InternalUserUpdateItemResultSchema>

export const InternalUserUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  InternalUserUpdateItemResultSchema
)

export type InternalUserUpdateItemResponse = z.infer<typeof InternalUserUpdateItemResponseSchema>

export const updateItem = async <ResponseType = InternalUserUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: InternalUserUpdateItemParams
  body: InternalUserUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'patch',
    url: `${endpointUrl}/${id}`,
  })
  return response?.data
}

export const InternalUserActivationItemParamsSchema = z.object({ id: z.number() })

export type InternalUserActivationItemParams = z.infer<typeof InternalUserActivationItemParamsSchema>

export const InternalUserActivationItemBodySchema = z.object({
  status: z.union([z.literal(0), z.literal(1)]),
})

export type InternalUserActivationItemBody = z.infer<typeof InternalUserActivationItemBodySchema>

export const InternalUserActivationItemResultSchema = z.object({
  user_id: z.string(),
  name: z.string(),
  email: z.string(),
  phone_number: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
  has_password: z.boolean(),
  roles: z.array(z.string()),
})

export type InternalUserActivationItemResult = z.infer<typeof InternalUserActivationItemResultSchema>

export const InternalUserActivationItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  InternalUserActivationItemResultSchema
)

export type InternalUserActivationItemResponse = z.infer<typeof InternalUserActivationItemResponseSchema>

export const activationItem = async <ResponseType = InternalUserActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: InternalUserActivationItemParams
  body: InternalUserActivationItemBody
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
