import { common } from '@apps/split/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { HttpBaseResponseMetaSchema } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/tour-location`

export const MasterTourLocationDeleteItemParamsSchema = z.object({ id: z.number() })

export type MasterTourLocationDeleteItemParams = z.infer<typeof MasterTourLocationDeleteItemParamsSchema>

export const MasterTourLocationDeleteItemResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type MasterTourLocationDeleteItemResponse = z.infer<typeof MasterTourLocationDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = MasterTourLocationDeleteItemResponse>({
  params,
  options,
}: {
  params: MasterTourLocationDeleteItemParams
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
