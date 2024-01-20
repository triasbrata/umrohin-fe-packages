import { common } from '@apps/packages/lib/constants'
import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/group`

export const MitraGroupDeleteItemParamsSchema = z.object({ id: z.number() })

export type MitraGroupDeleteItemParams = z.infer<typeof MitraGroupDeleteItemParamsSchema>

export const MitraGroupDeleteItemResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type MitraGroupDeleteItemResponse = z.infer<typeof MitraGroupDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = MitraGroupDeleteItemResponse>({
  params,
  options,
}: {
  params: MitraGroupDeleteItemParams
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
