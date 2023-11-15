import { common } from '@apps/split/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/customer`

export const CustomerActivationItemParamsSchema = z.object({ id: z.number() })

export type CustomerActivationItemParams = z.infer<typeof CustomerActivationItemParamsSchema>

export const CustomerActivationItemBodySchema = z.object({
  status: z.union([z.literal(0), z.literal(1)]),
})

export type CustomerActivationItemBody = z.infer<typeof CustomerActivationItemBodySchema>

export const CustomerActivationItemResultSchema = z.object({
  costumer_id: z.string(),
  user_id: z.string(),
  user: z.object({
    name: z.string(),
    phone_number: z.string(),
    email: z.string(),
    status: z.union([z.literal(0), z.literal(1)]),
  }),
})

export type CustomerActivationItemResult = z.infer<typeof CustomerActivationItemResultSchema>

export const CustomerActivationItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerActivationItemResultSchema
)

export type CustomerActivationItemResponse = z.infer<typeof CustomerActivationItemResponseSchema>

export const activationItem = async <ResponseType = CustomerActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: CustomerActivationItemParams
  body: CustomerActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'patch',
    url: `${endpointUrl}/${id}/status`,
  })
  return response?.data
}
