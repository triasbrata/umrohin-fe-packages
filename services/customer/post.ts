import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const CustomerCreateItemBodySchema = zfd.formData({
  name: zfd.text(),
  email: zfd.text(),
  password: zfd.text(),
  status: zfd.text(),
})
export type CustomerCreateItemBody = z.infer<typeof CustomerCreateItemBodySchema>

export const CustomerCreateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  status: z.string(),
})
export type CustomerCreateItemResult = z.infer<typeof CustomerCreateItemResultSchema>

export const CustomerCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerCreateItemResultSchema.nullable()
)
export type CustomerCreateItemResponse = z.infer<typeof CustomerCreateItemResponseSchema>

export const createItem = async <ResponseType = CustomerCreateItemResponse>({
  body,
  options,
}: {
  body: CustomerCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'post',
    url: '/v1/customers',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
