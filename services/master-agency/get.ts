import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/agency`

export const MasterAgencyListParamsSchema = z.object({
  page: z.number().optional(),
  page_size: z.number().optional(),
  name: z.string().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type MasterAgencyListParams = z.infer<typeof MasterAgencyListParamsSchema>

export const MasterAgencyListItemSchema = z.object({
  agency_id: z.string(),
  name: z.string(),
  director_name: z.string(),
  business_phone_number: z.string(),
  business_certificate_number: z.string(),
  business_certificate_year: z.number(),
  is_hq: z.boolean(),
  address: z.string(),
  bank_id: z.number(),
  bank_number: z.string(),
  bank_owner_name: z.string(),
  is_highlight: z.boolean(),
  reject_reason: z.union([z.string().optional(), z.null()]),
  verification_status: z.union([z.literal(0), z.literal(1), z.literal(-1), z.boolean()]),
  thumbnail: z.string(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MasterAgencyListItem = z.infer<typeof MasterAgencyListItemSchema>

export const MasterAgencyListResponseSchema = httpGetListResponseSchemaBuilder(MasterAgencyListItemSchema)

export type MasterAgencyListResponse = z.infer<typeof MasterAgencyListResponseSchema>

export const getList = async <ResponseType = MasterAgencyListResponse>({
  params,
  options,
}: {
  params: MasterAgencyListParams
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
