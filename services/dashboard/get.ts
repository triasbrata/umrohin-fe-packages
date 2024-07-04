import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const DashboardSchema = z.object({
  total_customer: z.number(),
  total_order: z.number(),
})
export type Dashboard = z.infer<typeof DashboardSchema>

export const DashboardResponseSchema = httpGetDetailResponseSchemaBuilder(DashboardSchema)
export type DashboardResponse = z.infer<typeof DashboardResponseSchema>

export const getDashboard = async <ResponseType = DashboardResponse>(options?: AxiosRequestConfig) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `/v1/reports/dashboard`,
  })
  return response?.data
}
