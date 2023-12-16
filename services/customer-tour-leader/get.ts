import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder, httpGetListResponseSchemaBuilder } from '../BaseResponse'
import { apiCall } from '../apiService'

const endpointTourLeader = `${common.ROOT_ENDPOINT}/homepage/tour-leaders`

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

export const CustomerTourLeadersResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
})

export const CustomerTourLeadersResponseSchema = httpGetListResponseSchemaBuilder(CustomerTourLeadersResultSchema)
export type CustomerTourLeadersResponse = z.infer<typeof CustomerTourLeadersResponseSchema>

export const CustomerTourLeadersParamsSchema = z.object({ pointer: z.number().optional(), take: z.number().optional() })
export type CustomerTourLeadersParams = z.infer<typeof CustomerTourLeadersParamsSchema>

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
    url: `${endpointTourLeader}/${id}`,
  })
  return response?.data
}

export const getTourLeaders = async <ResponseType = CustomerTourLeadersResponse>({
  params,
  options,
}: {
  params: CustomerTourLeadersParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    params,
    url: `${endpointTourLeader}`,
  })
  return response?.data
}
