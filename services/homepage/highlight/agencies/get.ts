import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../../../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/homepage/highlight/agencies`

export const HomepageHighlightAgenciesListItemSchema = z.object({
  id: z.string(),
  image: z.string(),
  name: z.string(),
})

export type HomepageHighlightAgenciesListItem = z.infer<typeof HomepageHighlightAgenciesListItemSchema>

export const HomepageHighlightAgenciesListResponseSchema = httpGetListResponseSchemaBuilder(
  HomepageHighlightAgenciesListItemSchema
)

export type HomepageHighlightAgenciesListResponse = z.infer<typeof HomepageHighlightAgenciesListResponseSchema>

export const getHighlightAgenciesList = async <ResponseType = HomepageHighlightAgenciesListResponse>(
  options?: AxiosRequestConfig
) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: endpointUrl,
  })
  return response?.data
}
