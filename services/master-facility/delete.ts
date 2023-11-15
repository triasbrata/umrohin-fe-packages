import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { HttpBaseResponseMetaSchema } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/facility`

export const MasterFacilityDeleteItemParamsSchema = z.object({ id: z.number() })

export type MasterFacilityDeleteItemParams = z.infer<typeof MasterFacilityDeleteItemParamsSchema>

export const MasterFacilityDeleteItemResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type MasterFacilityDeleteItemResponse = z.infer<typeof MasterFacilityDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = MasterFacilityDeleteItemResponse>({
  params,
  options,
}: {
  params: MasterFacilityDeleteItemParams
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
