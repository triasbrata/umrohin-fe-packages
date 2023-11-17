import { common } from '@apps/packages/lib/constants'
import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/transaction`

export const CustomerTransactionDeleteItemParamsSchema = z.object({ id: z.number() })

export type CustomerTransactionDeleteItemParams = z.infer<typeof CustomerTransactionDeleteItemParamsSchema>

export const CustomerTransactionDeleteItemResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type CustomerTransactionDeleteItemResponse = z.infer<typeof CustomerTransactionDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = CustomerTransactionDeleteItemResponse>({
  params,
  options,
}: {
  params: CustomerTransactionDeleteItemParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'delete',
    url: `${endpointUrl}/${id}`,
  })
  return response?.data
}
