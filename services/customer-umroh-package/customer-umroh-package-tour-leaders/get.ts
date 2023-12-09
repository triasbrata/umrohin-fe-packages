import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageFilterTourLeaders = `${common.ROOT_ENDPOINT}/homepage/search/filter/tour-leaders`

export const CustomerPackageFilterTourLeadersResultSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    total: z.number(),
  })
)

export const CustomerPackageFilterTourLeadersResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerPackageFilterTourLeadersResultSchema
)
export type CustomerPackageFilterTourLeadersResponse = z.infer<typeof CustomerPackageFilterTourLeadersResponseSchema>

export const CustomerPackageFilterTourLeadersParamsSchema = z.object({
  search: z.string(),
  pointer: z.number(),
  take: z.number(),
})

export type CustomerPackageFilterTourLeadersParams = z.infer<typeof CustomerPackageFilterTourLeadersParamsSchema>

export const getTourLeaders = async <ResponseType = CustomerPackageFilterTourLeadersResponse>({
  params,
  options,
}: {
  params: CustomerPackageFilterTourLeadersParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    params,
    url: `${endpointPackageFilterTourLeaders}`,
  })
  return response?.data
}
