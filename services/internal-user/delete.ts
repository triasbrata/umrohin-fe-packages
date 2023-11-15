import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { HttpBaseResponseMetaSchema } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/user`

export const InternalUserDeleteItemParamsSchema = z.object({ id: z.number() })

export type InternalUserDeleteItemParams = z.infer<typeof InternalUserDeleteItemParamsSchema>

export const InternalUserDeleteItemResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type InternalUserDeleteItemResponse = z.infer<typeof InternalUserDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = InternalUserDeleteItemResponse>({
  params,
  options,
}: {
  params: InternalUserDeleteItemParams
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
