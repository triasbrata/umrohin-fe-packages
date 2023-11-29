import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageDetailFacility = `${common.ROOT_ENDPOINT}/homepage/package/detail/facility`

//result, response
export const CustomerDetailPackageFacilityResultSchema = z.array(
  z.object({
    icon: z.string().optional(),
    name: z.string().optional(),
    desc: z.string().optional(),
  })
)

export const CustomerDetailPackageFacilityResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerDetailPackageFacilityResultSchema
)
export type CustomerDetailPackageFacilityResponse = z.infer<typeof CustomerDetailPackageFacilityResponseSchema>

//id params
export const CustomerDetailPackageFacilityParamsSchema = z.object({ id: z.number() })
export type CustomerDetailPackageFacilityParams = z.infer<typeof CustomerDetailPackageFacilityParamsSchema>

export const getDetailFacility = async <ResponseType = CustomerDetailPackageFacilityResponse>({
  params,
  options,
}: {
  params: CustomerDetailPackageFacilityParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `${endpointPackageDetailFacility}/${id}`,
  })
  return response?.data
}
