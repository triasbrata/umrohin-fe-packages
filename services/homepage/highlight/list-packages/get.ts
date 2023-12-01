import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../../../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/homepage/highlight/packages`

export const HomepageHighlightPackagesListItemSchema = z.array(
  z.object({
    package_id: z.string(),
    package_name: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    price: z.number(),
    image: z.string(),
  })
)

export type HomepageHighlightPackagesListItem = z.infer<typeof HomepageHighlightPackagesListItemSchema>

export const HomepageHighlightPackagesListResponseSchema = httpGetListResponseSchemaBuilder(
  HomepageHighlightPackagesListItemSchema
)

export type HomepageHighlightPackagesListResponse = z.infer<typeof HomepageHighlightPackagesListResponseSchema>

export const getHighlightPackagesList = async <ResponseType = HomepageHighlightPackagesListResponse>(params?: {
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
