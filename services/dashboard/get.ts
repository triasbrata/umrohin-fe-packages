import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const DashboardTransactionSchema = z.object({
  totalTransaction: z.number(),
})

export type DashboardTransaction = z.infer<typeof DashboardTransactionSchema>

export const DashboardTransactionResponseSchema = httpGetDetailResponseSchemaBuilder(DashboardTransactionSchema)

export type DashboardTransactionResponse = z.infer<typeof DashboardTransactionResponseSchema>

export const getDashboardTransaction = async <ResponseType = DashboardTransactionResponse>(
  options?: AxiosRequestConfig
) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `${common.ROOT_ENDPOINT}/admin-dashboard/transaction`,
  })
  return response?.data
}

export const DashboardCustomerSchema = z.object({
  totalCustomer: z.number(),
})

export type DashboardCustomer = z.infer<typeof DashboardCustomerSchema>

export const DashboardCustomerResponseSchema = httpGetDetailResponseSchemaBuilder(DashboardCustomerSchema)

export type DashboardCustomerResponse = z.infer<typeof DashboardCustomerResponseSchema>

export const getDashboardCustomer = async <ResponseType = DashboardCustomerResponse>(options?: AxiosRequestConfig) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `${common.ROOT_ENDPOINT}/admin-dashboard/customers`,
  })
  return response?.data
}
