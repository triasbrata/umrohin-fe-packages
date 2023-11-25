import { common } from '@apps/packages/lib/constants'
import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/airlines`

export const AirlinesDeleteItemParamsSchema = z.object({ id: z.number() })

export type AirlinesDeleteItemParams = z.infer<typeof AirlinesDeleteItemParamsSchema>

export const AirlinesDeleteItemResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type AirlinesDeleteItemResponse = z.infer<typeof AirlinesDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = AirlinesDeleteItemResponse>({
  params,
  options,
}: {
  params: AirlinesDeleteItemParams
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
