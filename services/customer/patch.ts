import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const CustomerUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type CustomerUpdateItemParams = z.infer<typeof CustomerUpdateItemParamsSchema>

export const CustomerUpdateItemBodySchema = zfd.formData({
  name: zfd.text(),
  email: zfd.text(),
  password: zfd.text(),
  status: zfd.text(),
})
export type CustomerUpdateItemBody = z.infer<typeof CustomerUpdateItemBodySchema>

export const CustomerUpdateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  status: z.string(),
})
export type CustomerUpdateItemResult = z.infer<typeof CustomerUpdateItemResultSchema>

export const CustomerUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(CustomerUpdateItemResultSchema)
export type CustomerUpdateItemResponse = z.infer<typeof CustomerUpdateItemResponseSchema>

export const updateItem = async <ResponseType = CustomerUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: CustomerUpdateItemParams
  body: CustomerUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'put',
    url: `/v1/customers/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
