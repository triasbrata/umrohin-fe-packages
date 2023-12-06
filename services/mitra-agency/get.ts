import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/agency`

export const MitraAgencyListParamsSchema = z.object({
  page: z.number().optional(),
  page_size: z.number().optional(),
  name: z.string().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
  verification_status: z.union([z.literal(0), z.literal(1), z.literal(-1), z.boolean(), z.number()]).optional(),
})

export type MitraAgencyListParams = z.infer<typeof MitraAgencyListParamsSchema>

export const MitraAgencyListItemSchema = z.object({
  agency_id: z.string(),
  name: z.string(),
  director_name: z.string(),
  business_phone_number: z.string(),
  business_certificate_number: z.string(),
  business_certificate_year: z.number(),
  is_hq: z.boolean(),
  address: z.string(),
  bank_id: z.number().optional(),
  bank_code: z.string(),
  bank_number: z.string(),
  bank_owner_name: z.string(),
  is_highlight: z.boolean(),
  reject_reason: z.union([z.string().optional(), z.null()]),
  verification_status: z.union([z.literal(0), z.literal(1), z.literal(-1), z.boolean()]),
  thumbnail: z.string().optional(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MitraAgencyListItem = z.infer<typeof MitraAgencyListItemSchema>

export const MitraAgencyListResponseSchema = httpGetListResponseSchemaBuilder(MitraAgencyListItemSchema)

export type MitraAgencyListResponse = z.infer<typeof MitraAgencyListResponseSchema>

export const getList = async <ResponseType = MitraAgencyListResponse>({
  params,
  options,
}: {
  params: MitraAgencyListParams
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

export const MitraAgencyMetaSchema = z.object({
  label: z.string(),
  total: z.number(),
  value: z.string(),
})

export type MitraAgencyMeta = z.infer<typeof MitraAgencyMetaSchema>

export const MitraAgencyMetaResponseSchema = httpGetListResponseSchemaBuilder(MitraAgencyMetaSchema)

export type MitraAgencyMetaResponse = z.infer<typeof MitraAgencyMetaResponseSchema>

export const getMeta = async <ResponseType = MitraAgencyMetaResponse>({
  params,
  options,
}: {
  params: MitraAgencyListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: `${endpointUrl}/meta`,
  })
  return response?.data
}
