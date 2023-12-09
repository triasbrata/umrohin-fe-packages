import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageFilterAirport = `${common.ROOT_ENDPOINT}/homepage/search/filter/airport`

export const CustomerPackageFilterAirportResultSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    total: z.number(),
  })
)

export const CustomerPackageFilterAirportResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerPackageFilterAirportResultSchema
)
export type CustomerPackageFilterAirportResponse = z.infer<typeof CustomerPackageFilterAirportResponseSchema>

export const CustomerPackageFilterAirportParamsSchema = z.object({
  search: z.string(),
  pointer: z.number(),
  take: z.number(),
})

export type CustomerPackageFilterAirportParams = z.infer<typeof CustomerPackageFilterAirportParamsSchema>

export const getAirport = async <ResponseType = CustomerPackageFilterAirportResponse>({
  params,
  options,
}: {
  params: CustomerPackageFilterAirportParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    params,
    url: `${endpointPackageFilterAirport}`,
  })
  return response?.data
}
