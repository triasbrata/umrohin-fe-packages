import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/customer`

export const CustomerListParamsSchema = z.object({
  name: z.string().optional(),
  page: z.number().optional(),
  page_size: z.number().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type CustomerListParams = z.infer<typeof CustomerListParamsSchema>

export const CustomerListItemSchema = z.object({
  costumer_id: z.string(),
  user_id: z.string(),
  user: z.object({
    name: z.string(),
    phone_number: z.string(),
    email: z.string(),
    status: z.number(),
  }),
  is_highlight: z.boolean().optional(),
})

export type CustomerListItem = z.infer<typeof CustomerListItemSchema>

export const CustomerListResponseSchema = httpGetListResponseSchemaBuilder(CustomerListItemSchema)

export type CustomerListResponse = z.infer<typeof CustomerListResponseSchema>

export const getList = async <ResponseType = CustomerListResponse>({
  params,
  options,
}: {
  params: CustomerListParams
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
