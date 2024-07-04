import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const MasterPartnerUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterPartnerUpdateItemParams = z.infer<typeof MasterPartnerUpdateItemParamsSchema>

export const MasterPartnerUpdateItemBodySchema = zfd.formData({
  name: zfd.text(),
  director_name: zfd.text(),
  phone: zfd.text(),
  sk_number: zfd.text(),
  sk_year: zfd.text(),
  office_status: zfd.text(),
  office_address: zfd.text(),
  logo: z.union([zfd.file(), z.string()]),
  banner: z.union([zfd.file(), z.string()]),
  bank_name: zfd.text(),
  account_name: zfd.text(),
  account_number: zfd.text(),
  status: zfd.text(),
})
export type MasterPartnerUpdateItemBody = z.infer<typeof MasterPartnerUpdateItemBodySchema>

export const MasterPartnerUpdateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  director_name: z.string(),
  phone: z.string(),
  sk_number: z.string(),
  sk_year: z.string(),
  office_status: z.string(),
  office_address: z.string(),
  logo: z.string(),
  banner: z.string(),
  bank_name: z.string().optional(),
  account_name: z.string().optional(),
  account_number: z.string().optional(),
  status: z.string(),
})
export type MasterPartnerUpdateItemResult = z.infer<typeof MasterPartnerUpdateItemResultSchema>

export const MasterPartnerUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterPartnerUpdateItemResultSchema
)
export type MasterPartnerUpdateItemResponse = z.infer<typeof MasterPartnerUpdateItemResponseSchema>

export const updateItem = async <ResponseType = MasterPartnerUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterPartnerUpdateItemParams
  body: MasterPartnerUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'put',
    url: `/v1/partners/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
