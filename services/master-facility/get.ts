import { common } from '@apps/split/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetListResponseSchemaBuilder } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/facility`

export const MasterFacilityListParamsSchema = z.object({
  name: z.string().optional(),
  page: z.number().optional(),
  page_size: z.number().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type MasterFacilityListParams = z.infer<typeof MasterFacilityListParamsSchema>

export const MasterFacilityListItemSchema = z.object({
  facility_id: z.string(),
  name: z.string(),
  desc: z.string(),
  icon: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
})

export type MasterFacilityListItem = z.infer<typeof MasterFacilityListItemSchema>

export const MasterFacilityListResponseSchema = httpGetListResponseSchemaBuilder(MasterFacilityListItemSchema)

export type MasterFacilityListResponse = z.infer<typeof MasterFacilityListResponseSchema>

export const getList = async <ResponseType = MasterFacilityListResponse>({
  params,
  options,
}: {
  params: MasterFacilityListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: endpointUrl,
  })
  return response?.data
}
