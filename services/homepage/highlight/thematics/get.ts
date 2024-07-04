import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../../../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/homepage/highlight/thematics`

export const HomepageHighlightThematicsListItemSchema = z.object({
  thematic_id: z.string(),
  name: z.string(),
  image: z.string(),
})

export type HomepageHighlightThematicsListItem = z.infer<typeof HomepageHighlightThematicsListItemSchema>

export const HomepageHighlightThematicsListResponseSchema = httpGetListResponseSchemaBuilder(
  HomepageHighlightThematicsListItemSchema
)

export type HomepageHighlightThematicsListResponse = z.infer<typeof HomepageHighlightThematicsListResponseSchema>

export const getHighlightThematicsList = async <ResponseType = HomepageHighlightThematicsListResponse>(params?: {
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
