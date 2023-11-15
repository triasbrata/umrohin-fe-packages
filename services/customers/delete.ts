import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { HttpBaseResponseMetaSchema } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/customer`

export const CustomerDeleteItemParamsSchema = z.object({ id: z.number() })

export type CustomerDeleteItemParams = z.infer<typeof CustomerDeleteItemParamsSchema>

export const CustomerDeleteItemResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type CustomerDeleteItemResponse = z.infer<typeof CustomerDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = CustomerDeleteItemResponse>({
  params,
  options,
}: {
  params: CustomerDeleteItemParams
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
