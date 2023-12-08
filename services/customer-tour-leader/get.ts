import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../BaseResponse'
import { apiCall } from '../apiService'

const endpointTourLeaderHeader = `${common.ROOT_ENDPOINT}/homepage/tour-leaders`

export const CustomerTourLeaderHeaderResultSchema = z.object({
  thumbnail: z.string(),
  name: z.string(),
  image: z.string(),
})

export const CustomerTourLeaderHeaderResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerTourLeaderHeaderResultSchema
)
export type CustomerTourLeaderHeaderResponse = z.infer<typeof CustomerTourLeaderHeaderResponseSchema>

export const CustomerTourLeaderHeaderParamsSchema = z.object({ id: z.number() })
export type CustomerTourLeaderHeaderParams = z.infer<typeof CustomerTourLeaderHeaderParamsSchema>

export const getTourLeaderHeader = async <ResponseType = CustomerTourLeaderHeaderResponse>({
  params,
  options,
}: {
  params: CustomerTourLeaderHeaderParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `${endpointTourLeaderHeader}/${id}`,
  })
  return response?.data
}
