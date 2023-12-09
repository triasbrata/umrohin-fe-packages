import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageFilterThematics = `${common.ROOT_ENDPOINT}/homepage/search/filter/thematics`

export const CustomerPackageFilterThematicsResultSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    total: z.number(),
  })
)

export const CustomerPackageFilterThematicsResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerPackageFilterThematicsResultSchema
)
export type CustomerPackageFilterThematicsResponse = z.infer<typeof CustomerPackageFilterThematicsResponseSchema>

export const CustomerPackageFilterThematicsParamsSchema = z.object({
  search: z.string(),
  pointer: z.number(),
  take: z.number(),
})

export type CustomerPackageFilterThematicsParams = z.infer<typeof CustomerPackageFilterThematicsParamsSchema>

export const getThematics = async <ResponseType = CustomerPackageFilterThematicsResponse>({
  params,
  options,
}: {
  params: CustomerPackageFilterThematicsParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    params,
    url: `${endpointPackageFilterThematics}`,
  })
  return response?.data
}
