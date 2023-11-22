import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../../../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/homepage/search/results`

export const HomepageSearchResultListParamsSchema = z.object({
  keyword: z.string(),
})

export type HomepageSearchResultListParams = z.infer<typeof HomepageSearchResultListParamsSchema>

export const HomepageSearchResultListItemSchema = z.object({
  package_id: z.string(),
  package_name: z.string(),
  image: z.string(),
})

export type HomepageSearchResultListItem = z.infer<typeof HomepageSearchResultListItemSchema>

export const HomepageSearchResultListResponseSchema = httpGetListResponseSchemaBuilder(
  HomepageSearchResultListItemSchema
)

export type HomepageSearchResultListResponse = z.infer<typeof HomepageSearchResultListResponseSchema>

export const getSearchResultList = async <ResponseType = HomepageSearchResultListResponse>({
  params,
  options,
}: {
  params: HomepageSearchResultListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: endpointUrl,
  })
  return response?.data
}
