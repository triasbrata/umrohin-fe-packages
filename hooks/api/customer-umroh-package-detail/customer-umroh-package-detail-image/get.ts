import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageDetailImage = `${common.ROOT_ENDPOINT}/homepage/package/detail/images`

export const CustomerDetailPackageImageResultSchema = z.array(
  z.object({
    image: z.string().optional(),
    type: z.string().optional(),
  })
)

export const CustomerDetailPackageImageResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerDetailPackageImageResultSchema
)
export type CustomerDetailPackageImageResponse = z.infer<typeof CustomerDetailPackageImageResponseSchema>

//id params
export const CustomerDetailPackageImageParamsSchema = z.object({ id: z.number() })
export type CustomerDetailPackageImageParams = z.infer<typeof CustomerDetailPackageImageParamsSchema>

export const getDetailImage = async <ResponseType = CustomerDetailPackageImageResponse>({
  params,
  options,
}: {
  params: CustomerDetailPackageImageParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `${endpointPackageDetailImage}/${id}`,
  })
  return response?.data
}
