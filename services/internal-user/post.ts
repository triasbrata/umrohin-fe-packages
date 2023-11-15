import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/user`

export const InternalUserCreateItemBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  roles: z.array(z.string()),
})

export type InternalUserCreateItemBody = z.infer<typeof InternalUserCreateItemBodySchema>

export const InternalUserCreateItemResultSchema = z.object({
  user_id: z.string(),
  name: z.string(),
  email: z.string(),
  phone_number: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
  has_password: z.boolean(),
  roles: z.array(z.string()),
})

export type InternalUserCreateItemResult = z.infer<typeof InternalUserCreateItemResultSchema>

export const InternalUserCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  InternalUserCreateItemResultSchema
)

export type InternalUserCreateItemResponse = z.infer<typeof InternalUserCreateItemResponseSchema>

export const createItem = async <ResponseType = InternalUserCreateItemResponse>({
  body,
  options,
}: {
  body: InternalUserCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: endpointUrl,
  })
  return response?.data
}
