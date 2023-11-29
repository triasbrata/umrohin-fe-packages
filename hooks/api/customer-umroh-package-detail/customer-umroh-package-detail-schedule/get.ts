import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../BaseResponse'
import { apiCall } from '../../apiService'

const endpointPackageDetailSchedule = `${common.ROOT_ENDPOINT}/homepage/package/detail/schedule`

export const CustomerDetailPackageScheduleResultSchema = z.array(
  z.object({
    end_date: z.string(),
    start_date: z.string(),
  })
)

export const CustomerDetailPackageScheduleResponseSchema = httpGetDetailResponseSchemaBuilder(
  CustomerDetailPackageScheduleResultSchema
)
export type CustomerDetailPackageScheduleResponse = z.infer<typeof CustomerDetailPackageScheduleResponseSchema>

//id params
export const CustomerDetailPackageScheduleParamsSchema = z.object({ id: z.number() })
export type CustomerDetailPackageScheduleParams = z.infer<typeof CustomerDetailPackageScheduleParamsSchema>

export const getDetailSchedule = async <ResponseType = CustomerDetailPackageScheduleResponse>({
  params,
  options,
}: {
  params: CustomerDetailPackageScheduleParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `${endpointPackageDetailSchedule}/${id}`,
  })
  return response?.data
}
