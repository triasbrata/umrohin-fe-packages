import { common } from '@apps/split/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { HttpBaseResponseMetaSchema } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/city`

export const CityDeleteItemParamsSchema = z.object({ id: z.number() })

export type CityDeleteItemParams = z.infer<typeof CityDeleteItemParamsSchema>

export const CityDeleteItemResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type CityDeleteItemResponse = z.infer<typeof CityDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = CityDeleteItemResponse>({
  params,
  options,
}: {
  params: CityDeleteItemParams
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
