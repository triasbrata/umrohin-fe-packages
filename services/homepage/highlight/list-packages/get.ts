import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../../../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/homepage/highlight/packages`

export const HomepageHighlightPackagesListItemSchema = z.object({
  package_id: z.string(),
  package_name: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  price: z.number(),
  image: z.string(),
})

export type HomepageHighlightPackagesListItem = z.infer<typeof HomepageHighlightPackagesListItemSchema>

export const HomepageHighlightPackagesListResponseSchema = httpGetListResponseSchemaBuilder(
  HomepageHighlightPackagesListItemSchema
)

export type HomepageHighlightPackagesListResponse = z.infer<typeof HomepageHighlightPackagesListResponseSchema>

export const HomepageHighlightPackagesListParamsSchema = z.object({
  month: z.number().optional(),
  year: z.number().optional(),
})
export type HomepageHighlightPackagesListParams = z.infer<typeof HomepageHighlightPackagesListParamsSchema>

export const getHighlightPackagesList = async <ResponseType = HomepageHighlightPackagesListResponse>({
  options,
  params,
}: {
  options?: AxiosRequestConfig
  params: HomepageHighlightPackagesListParams
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: endpointUrl,
  })
  return response?.data
}
