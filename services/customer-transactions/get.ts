import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetListResponseSchemaBuilder } from '../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/transaction`

export const CustomerTransactionListParamsSchema = z.object({
  name: z.string().optional(),
  phone_number: z.string().optional(),
  page: z.number().optional(),
  page_size: z.number().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type CustomerTransactionListParams = z.infer<typeof CustomerTransactionListParamsSchema>

export const CustomerTransactionListItemSchema = z.object({
  transaction_id: z.number(),
  customer_id: z.string(),
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
  multiply: z.number(),
  buy_date: z.string(),
  transaction_package_price: z.object({
    bed_type: z.string(),
    price: z.number(),
  }),
  payment_method: z.string(),
  first_dp: z.number(),
  user_name: z.string(),
  status: z.number(),
  package_map_price_id: z.number(),
  package_id: z.number(),
  transaction_number: z.string(),
})

export type CustomerTransactionListItem = z.infer<typeof CustomerTransactionListItemSchema>

export const CustomerTransactionResponseSchema = httpGetListResponseSchemaBuilder(CustomerTransactionListItemSchema)

export type CustomerTransactionResponse = z.infer<typeof CustomerTransactionResponseSchema>

export const getList = async <ResponseType = CustomerTransactionResponse>({
  params,
  options,
}: {
  params: CustomerTransactionListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: endpointUrl,
  })
  return response?.data
}
