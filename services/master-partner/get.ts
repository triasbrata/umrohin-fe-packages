import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterPartnerListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  verification_status: z.string().optional(),
})
export type MasterPartnerListParams = z.infer<typeof MasterPartnerListParamsSchema>

export const MasterPartnerListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  director_name: z.string(),
  phone: z.string(),
  sk_number: z.string(),
  sk_year: z.number(),
  office_status: z.string(),
  office_address: z.string(),
  logo: z.string(),
  banner: z.string(),
  bank_name: z.string(),
  account_name: z.string(),
  account_number: z.string(),
  verification_status: z.string().nullable(),
  reason: z.string().nullable(),
  status: z.string(),
})
export type MasterPartnerListItem = z.infer<typeof MasterPartnerListItemSchema>

export const MasterPartnerListResponseSchema = httpGetListResponseSchemaBuilder(MasterPartnerListItemSchema)
export type MasterPartnerListResponse = z.infer<typeof MasterPartnerListResponseSchema>

export const getList = async <ResponseType = MasterPartnerListResponse>({
  params,
  options,
}: {
  params: MasterPartnerListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: 'v1/partners',
  })
  return response?.data
}
