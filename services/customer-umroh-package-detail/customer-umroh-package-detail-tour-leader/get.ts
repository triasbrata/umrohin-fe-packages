import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageDetailTourLeader = `${common.ROOT_ENDPOINT}/homepage/package/detail/tour-leader`

export const CustomerDetailPackageTourLeaderResultSchema = z.array(
  z.object({
    name: z.string().optional(),
    desc: z.string().optional(),
    image: z.string().optional(),
  })
)

export const CustomerDetailPackageTourLeaderResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerDetailPackageTourLeaderResultSchema
)
export type CustomerDetailPackageTourLeaderResponse = z.infer<typeof CustomerDetailPackageTourLeaderResponseSchema>

//id params
export const CustomerDetailPackageTourLeaderParamsSchema = z.object({ id: z.number() })
export type CustomerDetailPackageTourLeaderParams = z.infer<typeof CustomerDetailPackageTourLeaderParamsSchema>

export const getDetailTourLeader = async <ResponseType = CustomerDetailPackageTourLeaderResponse>({
  params,
  options,
}: {
  params: CustomerDetailPackageTourLeaderParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `${endpointPackageDetailTourLeader}/${id}`,
  })
  return response?.data
}
