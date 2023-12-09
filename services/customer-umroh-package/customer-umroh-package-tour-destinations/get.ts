import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageFilterTourDestinations = `${common.ROOT_ENDPOINT}/homepage/search/filter/tour-destinations`

export const CustomerPackageFilterTourDestinationsResultSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    image: z.string(),
    total: z.number(),
  })
)

export const CustomerPackageFilterTourDestinationsResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerPackageFilterTourDestinationsResultSchema
)
export type CustomerPackageFilterTourDestinationsResponse = z.infer<
  typeof CustomerPackageFilterTourDestinationsResponseSchema
>

export const CustomerPackageFilterTourDestinationsParamsSchema = z.object({
  search: z.string(),
  pointer: z.number(),
  take: z.number(),
})

export type CustomerPackageFilterTourDestinationsParams = z.infer<
  typeof CustomerPackageFilterTourDestinationsParamsSchema
>

export const getTourDestinations = async <ResponseType = CustomerPackageFilterTourDestinationsResponse>({
  params,
  options,
}: {
  params: CustomerPackageFilterTourDestinationsParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    params,
    url: `${endpointPackageFilterTourDestinations}`,
  })
  return response?.data
}
