import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageFilterAirline = `${common.ROOT_ENDPOINT}/homepage/search/filter/airline`

export const CustomerPackageFilterAirlineResultSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    total: z.number(),
  })
)

export const CustomerPackageFilterAirlineResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerPackageFilterAirlineResultSchema
)
export type CustomerPackageFilterAirlineResponse = z.infer<typeof CustomerPackageFilterAirlineResponseSchema>

export const CustomerPackageFilterAirlineParamsSchema = z.object({
  search: z.string(),
  pointer: z.number(),
  take: z.number(),
})

export type CustomerPackageFilterAirlineParams = z.infer<typeof CustomerPackageFilterAirlineParamsSchema>

export const getAirline = async <ResponseType = CustomerPackageFilterAirlineResponse>({
  params,
  options,
}: {
  params: CustomerPackageFilterAirlineParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    params,
    url: `${endpointPackageFilterAirline}`,
  })
  return response?.data
}
