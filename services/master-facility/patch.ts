import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/facility`

export const MasterFacilityActivationItemParamsSchema = z.object({ id: z.number() })

export type MasterFacilityActivationItemParams = z.infer<typeof MasterFacilityActivationItemParamsSchema>

export const MasterFacilityActivationItemBodySchema = z.object({
  status: z.union([z.literal(0), z.literal(1)]),
})

export type MasterFacilityActivationItemBody = z.infer<typeof MasterFacilityActivationItemBodySchema>

export const MasterFacilityActivationItemResultSchema = z.object({
  facility_id: z.string(),
  name: z.string(),
  desc: z.string(),
  icon: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
})

export type MasterFacilityActivationItemResult = z.infer<typeof MasterFacilityActivationItemResultSchema>

export const MasterFacilityActivationItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterFacilityActivationItemResultSchema
)

export type MasterFacilityActivationItemResponse = z.infer<typeof MasterFacilityActivationItemResponseSchema>

export const activationItem = async <ResponseType = MasterFacilityActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterFacilityActivationItemParams
  body: MasterFacilityActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'patch',
    url: `${endpointUrl}/${id}/status`,
  })
  return response?.data
}
