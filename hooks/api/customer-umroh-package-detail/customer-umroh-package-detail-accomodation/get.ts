import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageDetailAccomodation = `${common.ROOT_ENDPOINT}/homepage/package/detail/accomodation`

export const CustomerDetailPackageAccomodationResultSchema = z.array(
  z.object({
    star: z.number().optional(),
    distance_to_nabawi: z.number().optional(),
    city_name: z.string().optional(),
    country_name: z.string().optional(),
    distance_to_haram: z.number().optional(),
    image: z.string(),
    name: z.string().optional(),
    province: z.string().optional(),
  })
)

export const CustomerDetailPackageAccomodationResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerDetailPackageAccomodationResultSchema
)
export type CustomerDetailPackageAccomodationResponse = z.infer<typeof CustomerDetailPackageAccomodationResponseSchema>

//id params
export const CustomerDetailPackageAccomodationParamsSchema = z.object({ id: z.number() })
export type CustomerDetailPackageAccomodationParams = z.infer<typeof CustomerDetailPackageAccomodationParamsSchema>

export const getDetailAccomodation = async <ResponseType = CustomerDetailPackageAccomodationResponse>({
  params,
  options,
}: {
  params: CustomerDetailPackageAccomodationParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `${endpointPackageDetailAccomodation}/${id}`,
  })
  return response?.data
}
