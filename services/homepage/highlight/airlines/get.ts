import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../../../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/homepage/highlight/airlines`

export const HomepageHighlightAirlinesListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
})

export type HomepageHighlightAirlinesListItem = z.infer<typeof HomepageHighlightAirlinesListItemSchema>

export const HomepageHighlightAirlinesListResponseSchema = httpGetListResponseSchemaBuilder(
  HomepageHighlightAirlinesListItemSchema
)

export type HomepageHighlightAirlinesListResponse = z.infer<typeof HomepageHighlightAirlinesListResponseSchema>

export const getHighlightAirlinesList = async <ResponseType = HomepageHighlightAirlinesListResponse>(
  options?: AxiosRequestConfig
) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: endpointUrl,
  })
  return response?.data
}
