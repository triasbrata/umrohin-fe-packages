import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const PackageListTicketUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type PackageListTicketUpdateItemParams = z.infer<typeof PackageListTicketUpdateItemParamsSchema>

export const PackageListTicketUpdateItemBodySchema = zfd.formData({
  provider_id: zfd.text(),
  flight_id: zfd.text(),
  no: zfd.text(),
  status: zfd.text(),
  is_active: z.boolean(),
})
export type PackageListTicketUpdateItemBody = z.infer<typeof PackageListTicketUpdateItemBodySchema>

export const PackageListTicketUpdateItemResultSchema = z.object({
  id: z.string(),
  provider_id: z.string(),
  flight_id: z.string(),
  no: z.string(),
  status: z.string(),
  is_active: z.boolean(),
})
export type PackageListTicketUpdateItemResult = z.infer<typeof PackageListTicketUpdateItemResultSchema>

export const PackageListTicketUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  PackageListTicketUpdateItemResultSchema
)
export type PackageListTicketUpdateItemResponse = z.infer<typeof PackageListTicketUpdateItemResponseSchema>

export const updateItem = async <ResponseType = PackageListTicketUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: PackageListTicketUpdateItemParams
  body: PackageListTicketUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/tickets/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
