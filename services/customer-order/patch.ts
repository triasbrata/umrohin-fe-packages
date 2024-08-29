import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const CustomerOrderUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type CustomerOrderUpdateItemParams = z.infer<typeof CustomerOrderUpdateItemParamsSchema>

export const CustomerOrderUpdateItemBodySchema = zfd.formData({
  payment_status: zfd.text(),
})
export type CustomerOrderUpdateItemBody = z.infer<typeof CustomerOrderUpdateItemBodySchema>

export const CustomerUpdateItemResultSchema = z.object({
  id: z.string(),
  payment_status: z.string(),
})
export type CustomerOrderUpdateItemResult = z.infer<typeof CustomerUpdateItemResultSchema>

export const CustomerOrderUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(CustomerUpdateItemResultSchema)
export type CustomerOrderUpdateItemResponse = z.infer<typeof CustomerOrderUpdateItemResponseSchema>

export const updateItem = async <ResponseType = CustomerOrderUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: CustomerOrderUpdateItemParams
  body: CustomerOrderUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/orders/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response?.data
}
