import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageDetailPrice = `${common.ROOT_ENDPOINT}/homepage/package/detail/price`

export const CustomerDetailPackagePriceResultSchema = z.array(
  z.object({
    bed_type: z.string().optional(),
    price: z.string(),
  })
)

export const CustomerDetailPackagePriceResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerDetailPackagePriceResultSchema
)
export type CustomerDetailPackagePriceResponse = z.infer<typeof CustomerDetailPackagePriceResponseSchema>

//id params
export const CustomerDetailPackagePriceParamsSchema = z.object({ id: z.number() })
export type CustomerDetailPackagePriceParams = z.infer<typeof CustomerDetailPackagePriceParamsSchema>

export const getDetailPrice = async <ResponseType = CustomerDetailPackagePriceResponse>({
  params,
  options,
}: {
  params: CustomerDetailPackagePriceParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `${endpointPackageDetailPrice}/${id}`,
  })
  return response?.data
}
