import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/thematic`

export const ThematicDeleteItemParamsSchema = z.object({ id: z.number() })

export type ThematicDeleteItemParams = z.infer<typeof ThematicDeleteItemParamsSchema>

export const ThematicDeleteItemResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type ThematicDeleteItemResponse = z.infer<typeof ThematicDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = ThematicDeleteItemResponse>({
  params,
  options,
}: {
  params: ThematicDeleteItemParams
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
