import { common } from '@apps/packages/lib/constants'
import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/tour-leader`

export const TourLeaderDeleteItemParamsSchema = z.object({ id: z.number() })

export type TourLeaderDeleteItemParams = z.infer<typeof TourLeaderDeleteItemParamsSchema>

export const TourLeaderDeleteItemResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type TourLeaderDeleteItemResponse = z.infer<typeof TourLeaderDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = TourLeaderDeleteItemResponse>({
  params,
  options,
}: {
  params: TourLeaderDeleteItemParams
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
