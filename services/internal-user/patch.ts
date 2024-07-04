import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const InternalUserUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type InternalUserUpdateItemParams = z.infer<typeof InternalUserUpdateItemParamsSchema>

export const InternalUserUpdateItemBodySchema = zfd.formData({
  name: zfd.text(),
  email: zfd.text(),
  password: zfd.text(),
  role_id: zfd.text(),
  status: zfd.text(),
})
export type InternalUserUpdateItemBody = z.infer<typeof InternalUserUpdateItemBodySchema>

export const InternalUserUpdateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role_id: z.string(),
  status: z.string(),
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
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'put',
    url: `/v1/users_internal/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
