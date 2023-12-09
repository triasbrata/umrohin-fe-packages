import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageFilterFacility = `${common.ROOT_ENDPOINT}/homepage/search/filter/facility`

export const CustomerPackageFilterFacilityResultSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    total: z.number(),
  })
)

export const CustomerPackageFilterFacilityResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerPackageFilterFacilityResultSchema
)
export type CustomerPackageFilterFacilityResponse = z.infer<typeof CustomerPackageFilterFacilityResponseSchema>

export const CustomerPackageFilterFacilityParamsSchema = z.object({
  search: z.string(),
  pointer: z.number(),
  take: z.number(),
})

export type CustomerPackageFilterFacilityParams = z.infer<typeof CustomerPackageFilterFacilityParamsSchema>

export const getFacility = async <ResponseType = CustomerPackageFilterFacilityResponse>({
  params,
  options,
}: {
  params: CustomerPackageFilterFacilityParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    params,
    url: `${endpointPackageFilterFacility}`,
  })
  return response?.data
}
