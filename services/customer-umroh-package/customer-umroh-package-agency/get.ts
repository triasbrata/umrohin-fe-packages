import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageFilterAgency = `${common.ROOT_ENDPOINT}/homepage/search/filter/agency`

export const CustomerPackageFilterAgencyResultSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    total: z.number(),
  })
)

export const CustomerPackageFilterAgencyResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerPackageFilterAgencyResultSchema
)
export type CustomerPackageFilterAgencyResponse = z.infer<typeof CustomerPackageFilterAgencyResponseSchema>

export const CustomerPackageFilterAgencyParamsSchema = z.object({
  search: z.string(),
  pointer: z.number(),
  take: z.number(),
})

export type CustomerPackageFilterAgencyParams = z.infer<typeof CustomerPackageFilterAgencyParamsSchema>

export const getAgency = async <ResponseType = CustomerPackageFilterAgencyResponse>({
  params,
  options,
}: {
  params: CustomerPackageFilterAgencyParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    params,
    url: `${endpointPackageFilterAgency}`,
  })
  return response?.data
}
