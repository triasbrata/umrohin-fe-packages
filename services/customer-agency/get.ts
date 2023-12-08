import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../BaseResponse'
import { apiCall } from '../apiService'

const endpointAgencyHeader = `${common.ROOT_ENDPOINT}/homepage/agency`

export const CustomerAgencyHeaderResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
})

export const CustomerAgencyHeaderResponseSchema = httpGetDetailResponseSchemaBuilder(CustomerAgencyHeaderResultSchema)
export type CustomerAgencyHeaderResponse = z.infer<typeof CustomerAgencyHeaderResponseSchema>

export const CustomerAgencyHeaderParamsSchema = z.object({ id: z.number() })
export type CustomerAgencyHeaderParams = z.infer<typeof CustomerAgencyHeaderParamsSchema>

export const getAgencyHeader = async <ResponseType = CustomerAgencyHeaderResponse>({
  params,
  options,
}: {
  params: CustomerAgencyHeaderParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `${endpointAgencyHeader}/${id}`,
  })
  return response?.data
}
