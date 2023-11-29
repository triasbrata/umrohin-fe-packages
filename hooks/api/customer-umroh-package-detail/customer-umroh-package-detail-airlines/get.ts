import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageDetailAirlines = `${common.ROOT_ENDPOINT}/homepage/package/detail/airlines`

export const CustomerDetailPackageAirlinesResultSchema = z.array(
  z.object({
    time_estimation: z.string().optional(),
    dest_airport: z.object({
      name: z.string().optional(),
      code: z.string().optional(),
      city: z.object({
        city_name: z.string().optional(),
        country_name: z.string().optional(),
        country_code: z.string().optional(),
        province: z.string().optional(),
      }),
    }),
    origin_airport: z.object({
      name: z.string().optional(),
      code: z.string().optional(),
      city: z.object({
        city_name: z.string().optional(),
        country_name: z.string().optional(),
        country_code: z.string().optional(),
        province: z.string().optional(),
      }),
    }),
  })
)

export const CustomerDetailPackageAirlinesResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerDetailPackageAirlinesResultSchema
)
export type CustomerDetailPackageAirlinesResponse = z.infer<typeof CustomerDetailPackageAirlinesResponseSchema>

//id params
export const CustomerDetailPackageAirlinesParamsSchema = z.object({ id: z.number() })
export type CustomerDetailPackageAirlinesParams = z.infer<typeof CustomerDetailPackageAirlinesParamsSchema>

export const getDetailAirlines = async <ResponseType = CustomerDetailPackageAirlinesResponse>({
  params,
  options,
}: {
  params: CustomerDetailPackageAirlinesParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `${endpointPackageDetailAirlines}/${id}`,
  })
  return response?.data
}
