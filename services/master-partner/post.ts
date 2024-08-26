import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const MasterPartnerCreateItemBodySchema = zfd.formData({
  name: zfd.text(),
  director_name: zfd.text(),
  phone: zfd.text(),
  sk_number: zfd.text(),
  sk_year: zfd.numeric(),
  office_status: zfd.text(),
  office_address: zfd.text(),
  logo: zfd.file(),
  banner: zfd.file(),
  bank_name: zfd.text(),
  account_name: zfd.text(),
  account_number: zfd.text(),
  status: zfd.text(),
})
export type MasterPartnerCreateItemBody = z.infer<typeof MasterPartnerCreateItemBodySchema>

export const MasterPartnerCreateItemResultSchema = z.object({
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
  bank_name: z.string().optional(),
  account_name: z.string().optional(),
  account_number: z.string().optional(),
  status: z.string(),
})
export type MasterPartnerCreateItemResult = z.infer<typeof MasterPartnerCreateItemResultSchema>

export const MasterPartnerCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterPartnerCreateItemResultSchema.nullable()
)
export type MasterPartnerCreateItemResponse = z.infer<typeof MasterPartnerCreateItemResponseSchema>

export const createItem = async <ResponseType = MasterPartnerCreateItemResponse>({
  body,
  options,
}: {
  body: MasterPartnerCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'post',
    url: '/v1/partners',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
