import { common } from '@apps/packages/lib/constants'
import { HttpBaseResponseMetaSchema } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/packages`

export const PackageDeleteItemParamsSchema = z.object({ id: z.number() })

export type PackageDeleteItemParams = z.infer<typeof PackageDeleteItemParamsSchema>

export const PackageDeleteItemResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type PackageDeleteItemResponse = z.infer<typeof PackageDeleteItemResponseSchema>

export const deleteItem = async <ResponseType = PackageDeleteItemResponse>({
  params,
  options,
}: {
  params: PackageDeleteItemParams
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
