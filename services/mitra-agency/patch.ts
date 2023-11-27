import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/agency`

export const AgencyUpdateItemParamsSchema = z.object({ id: z.number() })

export type AgencyUpdateItemParams = z.infer<typeof AgencyUpdateItemParamsSchema>

export const AgencyUpdateItemBodySchema = zfd.formData({
  name: zfd.text(),
  director_name: zfd.text(),
  business_phone_number: zfd.text(),
  business_certificate_number: zfd.text(),
  business_certificate_year: zfd.numeric(),
  address: zfd.text(),
  is_highlight: z.boolean(),
  is_hq: z.boolean(),
  bank_id: z.number().optional(),
  bank_number: zfd.text(),
  bank_owner_name: zfd.text(),
  image: z.union([zfd.file(), z.string()]),
  thumbnail: z.union([zfd.file(), z.string()]).optional(),
})

export type AgencyUpdateItemBody = z.infer<typeof AgencyUpdateItemBodySchema>

export const AgencyUpdateItemResultSchema = z.object({
  agency_id: z.string(),
  name: z.string(),
  director_name: z.string(),
  business_phone_number: z.string(),
  business_certificate_number: z.string(),
  business_certificate_year: z.number(),
  address: z.string(),
  is_hq: z.boolean(),
  is_highlight: z.boolean(),
  bank_id: z.number(),
  bank_number: z.string(),
  bank_owner_name: z.string(),
  thumbnail: z.string(),
  image: z.string(),
  reject_reason: z.string().optional(),
  verification_status: z.union([z.literal(0), z.literal(1), z.literal(-1), z.boolean()]),
  participation: z.boolean().optional(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type AgencyUpdateItemResult = z.infer<typeof AgencyUpdateItemResultSchema>

export const AgencyUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(AgencyUpdateItemResultSchema)

export type AgencyUpdateItemResponse = z.infer<typeof AgencyUpdateItemResponseSchema>

export const updateItem = async <ResponseType = AgencyUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: AgencyUpdateItemParams
  body: AgencyUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    if (typeof value === 'object') formData.append(key, value)
    else formData.append(key, value.toString())
  })
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'put',
    url: `${endpointUrl}/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

export const AgencyActivationItemParamsSchema = z.object({ id: z.number() })

export type AgencyActivationItemParams = z.infer<typeof AgencyActivationItemParamsSchema>

export const AgencyActivationItemBodySchema = z.object({
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type AgencyActivationItemBody = z.infer<typeof AgencyActivationItemBodySchema>

export const activationItem = async <ResponseType = AgencyUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: AgencyActivationItemParams
  body: AgencyActivationItemBody
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

export const AgencyVerificationItemParamsSchema = z.object({ id: z.number() })

export type AgencyVerificationItemParams = z.infer<typeof AgencyVerificationItemParamsSchema>

export const AgencyVerificationItemBodySchema = z.object({
  verification_status: z.union([z.literal(0), z.literal(1), z.literal(-1)]),
  reject_reason: z.union([z.string(), z.null()]),
})

export type AgencyVerificationItemBody = z.infer<typeof AgencyVerificationItemBodySchema>

export const verificationItem = async <ResponseType = AgencyUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: AgencyVerificationItemParams
  body: AgencyVerificationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'patch',
    url: `${endpointUrl}/${id}/verification`,
  })
  return response?.data
}
