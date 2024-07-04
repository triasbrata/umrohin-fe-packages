import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../../../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/homepage/highlight/tour-destinations`

export const HomepageHighlightTourDestinationsListItemSchema = z.object({
  tour_location_id: z.string(),
  name: z.string(),
  image: z.string(),
})

export type HomepageHighlightTourDestinationsListItem = z.infer<typeof HomepageHighlightTourDestinationsListItemSchema>

export const HomepageHighlightTourDestinationsListResponseSchema = httpGetListResponseSchemaBuilder(
  HomepageHighlightTourDestinationsListItemSchema
)

export type HomepageHighlightTourDestinationsListResponse = z.infer<
  typeof HomepageHighlightTourDestinationsListResponseSchema
>

export const getHighlightTourDestinationsList = async <ResponseType = HomepageHighlightTourDestinationsListResponse>(
  options?: AxiosRequestConfig
) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: endpointUrl,
  })
  return response?.data
}
