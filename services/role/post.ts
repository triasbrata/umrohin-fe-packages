import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const InternalUserCreateItemBodySchema = zfd.formData({
  name: zfd.text(),
  email: zfd.text(),
  password: zfd.text(),
  role_id: zfd.text(),
  status: zfd.text(),
})
export type InternalUserCreateItemBody = z.infer<typeof InternalUserCreateItemBodySchema>

export const InternalUserCreateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role_id: z.string(),
  status: z.string(),
})
export type InternalUserCreateItemResult = z.infer<typeof InternalUserCreateItemResultSchema>

export const InternalUserCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  InternalUserCreateItemResultSchema.nullable()
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
    url: '/v1/users_internal',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response?.data
}
