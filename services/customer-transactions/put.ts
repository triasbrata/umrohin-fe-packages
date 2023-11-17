import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/transaction`

export const CustomerTransactionUpdateItemParamsSchema = z.object({ id: z.number() })

export type CustomerTransactionUpdateItemParams = z.infer<typeof CustomerTransactionUpdateItemParamsSchema>

export const CustomerTransactionUpdateItemBodySchema = z.object({
  costumer_id: z.number(),
  package_id: z.number(),
  buy_date: z.string(),
  payment_method: z.string(),
  package_map_price_id: z.number(),
  status: z.number(),
  first_dp: z.number(),
  multiply: z.number(),
})

export type CustomerTransactionUpdateItemBody = z.infer<typeof CustomerTransactionUpdateItemBodySchema>

export const CustomerTransactionUpdateItemResultSchema = z.object({
  transaction_user: z.object({
    name: z.string(),
    phone_number: z.string(),
  }),
  transaction_package: z.object({
    name: z.string(),
    package_id: z.number(),
    thematic: z.string(),
    agency_name: z.string(),
  }),
  transaction_package_price: z.object({
    bed_type: z.string(),
    price: z.number(),
  }),
  transaction_id: z.number(),
  transaction_number: z.string(),
  buy_date: z.string(),
  costumer_id: z.number(),
  package_id: z.number(),
  package_map_price_id: z.number(),
  payment_method: z.string(),
  status: z.number(),
  first_dp: z.number(),
  multiply: z.number(),
  user_name: z.string(),
})

export type CustomerTransactionUpdateItemResult = z.infer<typeof CustomerTransactionUpdateItemResultSchema>

export const CustomerTransactionUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerTransactionUpdateItemResultSchema
)

export type CustomerTransactionUpdateItemResponse = z.infer<typeof CustomerTransactionUpdateItemResponseSchema>

export const updateItem = async <ResponseType = CustomerTransactionUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: CustomerTransactionUpdateItemParams
  body: CustomerTransactionUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `${endpointUrl}/${id}`,
  })
  return response?.data
}
