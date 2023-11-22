import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../../../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/homepage/highlight/keywords`

export const HomepageHighlightKeywordListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
})

export type HomepageHighlightKeywordListItem = z.infer<typeof HomepageHighlightKeywordListItemSchema>

export const HomepageHighlightKeywordListResponseSchema = httpGetListResponseSchemaBuilder(
  HomepageHighlightKeywordListItemSchema
)

export type HomepageHighlightKeywordListResponse = z.infer<typeof HomepageHighlightKeywordListResponseSchema>

export const getList = async <ResponseType = HomepageHighlightKeywordListResponse>({
  options,
}: {
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: endpointUrl,
  })
  return response?.data
}
