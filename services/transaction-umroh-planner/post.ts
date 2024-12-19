import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const TransactionUmrohPlannerUpdateHistoryItemBodySchema = z.object({
  order_id: z.string(),
  status_id: z.string(),
  is_paid: z.boolean(),
})
export type TransactionUmrohPlannerUpdateHistoryItemBody = z.infer<
  typeof TransactionUmrohPlannerUpdateHistoryItemBodySchema
>

const TransactionUmrohPlannerUpdateHistoryResponseSchema = z.object({
  order_id: z.string(),
  status_id: z.string(),
  id: z.string(),
  is_paid: z.boolean(),
})

export const TransactionUmrohPlannerUpdateHistoryResponse = httpGetListResponseSchemaBuilder(
  TransactionUmrohPlannerUpdateHistoryResponseSchema
)
export type TransactionUmrohPlannerUpdateHistoryResponse = z.infer<typeof TransactionUmrohPlannerUpdateHistoryResponse>

export const updateHistory = async <ResponseType = TransactionUmrohPlannerUpdateHistoryResponse>({
  body,
  options,
}: {
  body: TransactionUmrohPlannerUpdateHistoryItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: '/v1/orders_history',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response?.data
}
