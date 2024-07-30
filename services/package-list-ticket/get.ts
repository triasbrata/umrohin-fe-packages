import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const PackageListTicketListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  flight_id: z.string().optional(),
})
export type PackageListTicketListParams = z.infer<typeof PackageListTicketListParamsSchema>

export const PackageListTicketListItemSchema = z.object({
  id: z.string(),
  provider_id: z.string(),
  flight_id: z.string(),
  no: z.string(),
  status: z.string(),
  is_active: z.boolean(),
})
export type PackageListTicketListItem = z.infer<typeof PackageListTicketListItemSchema>

export const PackageListTicketListResponseSchema = httpGetListResponseSchemaBuilder(PackageListTicketListItemSchema)
export type PackageListTicketListResponse = z.infer<typeof PackageListTicketListResponseSchema>

export const getList = async <ResponseType = PackageListTicketListResponse>({
  params,
  options,
}: {
  params: PackageListTicketListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: '/v1/tickets',
  })
  return response?.data
}
