import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetListPointerResponseSchemaBuilder } from '../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/user-customer/history-transaction`

export const CustomerTransactionsHistoryParamsSchema = z.object({
  take: z.number().optional(),
  pointer: z.number().optional(),
  search: z.string().optional(),
})

export type CustomerTransactionsHistoryParams = z.infer<typeof CustomerTransactionsHistoryParamsSchema>

export const CustomerTransactionsHistoryItemSchema = z.object({
  transaction_id: z.string(),
  transaction_number: z.string(),
  buy_date: z.string(),
  payment_method: z.string(),
  first_dp: z.number(),
  multiply: z.number(),
  status: z.number(),
  package_name: z.string(),
  departure_date: z.string(),
  bed_type: z.string(),
  price: z.number(),
})

export type CustomerTransactionsHistoryItem = z.infer<typeof CustomerTransactionsHistoryItemSchema>

export const CustomerTransactionsHistoryResponseSchema = httpGetListPointerResponseSchemaBuilder(
  CustomerTransactionsHistoryItemSchema
)

export type CustomerTransactionsHistoryResponse = z.infer<typeof CustomerTransactionsHistoryResponseSchema>

export const getList = async <ResponseType = CustomerTransactionsHistoryResponse>({
  params,
  options,
}: {
  params: CustomerTransactionsHistoryParams
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
