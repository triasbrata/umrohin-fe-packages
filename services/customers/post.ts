import { common } from '@apps/split/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/customer`

export const CustomerCreateItemBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone_number: z.string(),
})

export type CustomerCreateItemBody = z.infer<typeof CustomerCreateItemBodySchema>

export const CustomerCreateItemResultSchema = z.object({
  costumer_id: z.string(),
  user_id: z.string(),
  user: z.object({
    name: z.string(),
    phone_number: z.string(),
    email: z.string(),
    status: z.union([z.literal(0), z.literal(1)]),
  }),
})

export type CustomerCreateItemResult = z.infer<typeof CustomerCreateItemResultSchema>

export const CustomerCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(CustomerCreateItemResultSchema)

export type CustomerCreateItemResponse = z.infer<typeof CustomerCreateItemResponseSchema>

export const createItem = async <ResponseType = CustomerCreateItemResponse>({
  body,
  options,
}: {
  body: CustomerCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: endpointUrl,
  })
  return response?.data
}
