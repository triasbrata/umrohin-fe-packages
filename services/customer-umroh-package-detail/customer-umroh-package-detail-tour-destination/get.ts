import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageDetailTourDestination = `${common.ROOT_ENDPOINT}/homepage/package/detail/tour-destination`

export const CustomerDetailPackageTourDestinationResultSchema = z.array(
  z.object({
    name: z.string().optional(),
    country_code: z.string().optional(),
    country_name: z.string().optional(),
    description: z.string().optional(),
    province: z.string().optional(),
    image: z.string().optional(),
  })
)

export const CustomerDetailPackageTourDestinationResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerDetailPackageTourDestinationResultSchema
)
export type CustomerDetailPackageTourDestinationResponse = z.infer<
  typeof CustomerDetailPackageTourDestinationResponseSchema
>

//id params
export const CustomerDetailPackageTourDestinationParamsSchema = z.object({ id: z.number() })
export type CustomerDetailPackageTourDestinationParams = z.infer<
  typeof CustomerDetailPackageTourDestinationParamsSchema
>

export const getDetailTourDestination = async <ResponseType = CustomerDetailPackageTourDestinationResponse>({
  params,
  options,
}: {
  params: CustomerDetailPackageTourDestinationParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `${endpointPackageDetailTourDestination}/${id}`,
  })
  return response?.data
}
