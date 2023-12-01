import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../../../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/homepage/highlight/tour-leaders`

export const HomepageHighlightTourLeadersListItemSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
  })
)

export type HomepageHighlightTourLeadersListItem = z.infer<typeof HomepageHighlightTourLeadersListItemSchema>

export const HomepageHighlightTourLeadersListResponseSchema = httpGetListResponseSchemaBuilder(
  HomepageHighlightTourLeadersListItemSchema
)

export type HomepageHighlightTourLeadersListResponse = z.infer<typeof HomepageHighlightTourLeadersListResponseSchema>

export const getHighlightTourLeadersList = async <ResponseType = HomepageHighlightTourLeadersListResponse>(params?: {
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
