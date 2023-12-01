import { common } from '@apps/packages/lib/constants'
import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/agency`

export const AgencyDeleteItemParamsSchema = z.object({ id: z.number() })

export type AgencyDeleteItemParams = z.infer<typeof AgencyDeleteItemParamsSchema>

export const AgencyDeleteItemResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type AgencyDeleteItemResponse = z.infer<typeof AgencyDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = AgencyDeleteItemResponse>({
  params,
  options,
}: {
  params: AgencyDeleteItemParams
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
