import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const MasterPartnerListParamsSchema = z.object({
  search: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  verification_status: z.string().optional(),
  is_deleted: z.boolean().optional(),
})
export type MasterPartnerListParams = z.infer<typeof MasterPartnerListParamsSchema>

export const MasterPartnerListItemSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  director_name: z.string().nullable(),
  phone: z.string().nullable(),
  sk_number: z.string().nullable(),
  sk_year: z.number().nullable(),
  office_status: z.string().nullable(),
  office_address: z.string().nullable(),
  logo: z.string().nullable(),
  banner: z.string().nullable(),
  bank_name: z.string().nullable(),
  account_name: z.string().nullable(),
  account_number: z.string().nullable(),
  verification_status: z.string().nullable(),
  reason: z.string().nullable(),
  status: z.string().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  ppiu_number: z.string().nullable(),
  pihk_number: z.string().nullable(),
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
