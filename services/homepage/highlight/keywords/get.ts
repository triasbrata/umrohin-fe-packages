import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../../../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/homepage/highlight/keywords`

export const HomepageHighlightKeywordsListItemSchema = z.object({
  id: z.number(),
  title: z.string(),
})

export type HomepageHighlightKeywordsListItem = z.infer<typeof HomepageHighlightKeywordsListItemSchema>

export const HomepageHighlightKeywordsListResponseSchema = httpGetListResponseSchemaBuilder(
  HomepageHighlightKeywordsListItemSchema
)

export type HomepageHighlightKeywordsListResponse = z.infer<typeof HomepageHighlightKeywordsListResponseSchema>

export const getHighlightKeywordsList = async <ResponseType = HomepageHighlightKeywordsListResponse>(params?: {
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
