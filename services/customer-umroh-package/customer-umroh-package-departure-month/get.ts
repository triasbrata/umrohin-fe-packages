import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageFilterDepartureMonth = `${common.ROOT_ENDPOINT}/homepage/search/filter/departure-month`

export const CustomerPackageFilterDepartureMonthResultSchema = z.array(
  z.object({
    id: z.number(),
    year: z.number(),
    name: z.string(),
  })
)

export const CustomerPackageFilterDepartureMonthResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerPackageFilterDepartureMonthResultSchema
)
export type CustomerPackageFilterDepartureMonthResponse = z.infer<
  typeof CustomerPackageFilterDepartureMonthResponseSchema
>

export const CustomerPackageFilterDepartureMonthParamsSchema = z.object({
  search: z.string(),
  pointer: z.number(),
  take: z.number(),
})

export type CustomerPackageFilterDepartureMonthParams = z.infer<typeof CustomerPackageFilterDepartureMonthParamsSchema>

export const getDepartureMonth = async <ResponseType = CustomerPackageFilterDepartureMonthResponse>({
  params,
  options,
}: {
  params: CustomerPackageFilterDepartureMonthParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    params,
    url: `${endpointPackageFilterDepartureMonth}`,
  })
  return response?.data
}
