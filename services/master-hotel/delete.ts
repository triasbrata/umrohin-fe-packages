import { common } from '@apps/packages/lib/constants'
import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/hotel`

export const HotelDeleteItemParamsSchema = z.object({ id: z.number() })

export type HotelDeleteItemParams = z.infer<typeof HotelDeleteItemParamsSchema>

export const HotelDeleteItemResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type HotelDeleteItemResponse = z.infer<typeof HotelDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = HotelDeleteItemResponse>({
  params,
  options,
}: {
  params: HotelDeleteItemParams
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
