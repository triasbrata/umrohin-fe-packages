import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/agency`

export const AgencyCreateItemBodySchema = zfd.formData({
  name: zfd.text(),
  director_name: zfd.text(),
  business_phone_number: zfd.text(),
  business_certificate_number: zfd.text(),
  business_certificate_year: zfd.numeric(),
  address: zfd.text(),
  is_highlight: z.boolean(),
  verification_status: z.union([z.literal(0), z.literal(1), z.literal(-1), z.boolean()]),
  is_hq: z.boolean(),
  bank_id: z.string(),
  bank_number: zfd.text(),
  bank_owner_name: zfd.text(),
  image: z.union([zfd.file(), z.string()]),
  thumbnail: z.union([zfd.file(), z.string()]),
})

export type AgencyCreateItemBody = z.infer<typeof AgencyCreateItemBodySchema>

export const AgencyCreateItemResultSchema = z.object({
  agency_id: z.string(),
  name: z.string(),
  director_name: z.string(),
  business_phone_number: z.string(),
  business_certificate_number: z.string(),
  business_certificate_year: z.number(),
  address: z.string(),
  is_hq: z.boolean(),
  is_highlight: z.boolean(),
  bank_id: z.string(),
  bank_number: z.string(),
  bank_owner_name: z.string(),
  thumbnail: z.string(),
  image: z.string(),
  reject_reason: z.string().optional(),
  verification_status: z.union([z.literal(0), z.literal(1), z.literal(-1), z.boolean()]),
  participation: z.boolean().optional(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type AgencyCreateItemResult = z.infer<typeof AgencyCreateItemResultSchema>

export const AgencyCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(AgencyCreateItemResultSchema)

export type AgencyCreateItemResponse = z.infer<typeof AgencyCreateItemResponseSchema>

export const createItem = async <ResponseType = AgencyCreateItemResponse>({
  body,
  options,
}: {
  body: AgencyCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    if (typeof value === 'object') formData.append(key, value)
    else formData.append(key, value.toString())
  })

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'post',
    url: endpointUrl,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
