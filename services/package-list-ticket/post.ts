import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const PackageListTicketCreateItemBodySchema = zfd.formData({
  provider_id: zfd.text(),
  flight_id: zfd.text(),
  no: zfd.text(),
  status: zfd.text(),
  is_active: z.boolean(),
})
export type PackageListTicketCreateItemBody = z.infer<typeof PackageListTicketCreateItemBodySchema>

export const PackageListTicketCreateItemResultSchema = z.object({
  id: z.string(),
  provider_id: z.string(),
  flight_id: z.string(),
  no: z.string(),
  status: z.string(),
  is_active: z.boolean(),
})
export type PackageListTicketCreateItemResult = z.infer<typeof PackageListTicketCreateItemResultSchema>

export const PackageListTicketCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  PackageListTicketCreateItemResultSchema.nullable()
)
export type PackageListTicketCreateItemResponse = z.infer<typeof PackageListTicketCreateItemResponseSchema>

export const createItem = async <ResponseType = PackageListTicketCreateItemResponse>({
  body,
  options,
}: {
  body: PackageListTicketCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: '/v1/tickets',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
