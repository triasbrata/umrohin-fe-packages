import { common } from '@apps/packages/lib/constants'
import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/group-member`

export const MitraGroupMemberDeleteItemParamsSchema = z.object({ id: z.number() })

export type MitraGroupMemberDeleteItemParams = z.infer<typeof MitraGroupMemberDeleteItemParamsSchema>

export const MitraGroupMemberDeleteItemResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type MitraGroupMemberDeleteItemResponse = z.infer<typeof MitraGroupMemberDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = MitraGroupMemberDeleteItemResponse>({
  params,
  options,
}: {
  params: MitraGroupMemberDeleteItemParams
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
