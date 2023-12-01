import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../../../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/homepage/highlight/meta-packages`

export const HomepageHighlightMetaPackagesListItemSchema = z.array(
  z.object({
    id: z.number(),
    year: z.number(),
    name: z.string(),
  })
)

export type HomepageHighlightMetaPackagesListItem = z.infer<typeof HomepageHighlightMetaPackagesListItemSchema>

export const HomepageHighlightMetaPackagesListResponseSchema = httpGetListResponseSchemaBuilder(
  HomepageHighlightMetaPackagesListItemSchema
)

export type HomepageHighlightMetaPackagesListResponse = z.infer<typeof HomepageHighlightMetaPackagesListResponseSchema>

export const getHighlightMetaPackagesList = async <ResponseType = HomepageHighlightMetaPackagesListResponse>(params?: {
  options?: AxiosRequestConfig
}) => {
  const { options } = params ?? {}
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: endpointUrl,
  })
  return response?.data
}
