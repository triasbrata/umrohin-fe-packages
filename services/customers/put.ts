import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/customer`

export const CustomerUpdateItemParamsSchema = z.object({ id: z.number() })

export type CustomerUpdateItemParams = z.infer<typeof CustomerUpdateItemParamsSchema>

export const CustomerUpdateItemBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone_number: z.string(),
})

export type CustomerUpdateItemBody = z.infer<typeof CustomerUpdateItemBodySchema>

export const CustomerUpdateItemResultSchema = z.object({
  costumer_id: z.string(),
  user_id: z.string(),
  user: z.object({
    name: z.string(),
    phone_number: z.string(),
    email: z.string(),
    status: z.union([z.literal(0), z.literal(1)]),
  }),
})

export type CustomerUpdateItemResult = z.infer<typeof CustomerUpdateItemResultSchema>

export const CustomerUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(CustomerUpdateItemResultSchema)

export type CustomerUpdateItemResponse = z.infer<typeof CustomerUpdateItemResponseSchema>

export const updateItem = async <ResponseType = CustomerUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: CustomerUpdateItemParams
  body: CustomerUpdateItemBody
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
