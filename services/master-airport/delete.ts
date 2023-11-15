import { common } from '@apps/split/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { HttpBaseResponseMetaSchema } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/airport`

export const MasterAirportDeleteItemParamsSchema = z.object({ id: z.number() })

export type MasterAirportDeleteItemParams = z.infer<typeof MasterAirportDeleteItemParamsSchema>

export const MasterAirportDeleteItemResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type MasterAirportDeleteItemResponse = z.infer<typeof MasterAirportDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = MasterAirportDeleteItemResponse>({
  params,
  options,
}: {
  params: MasterAirportDeleteItemParams
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
