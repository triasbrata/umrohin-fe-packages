import { HttpBaseResponseMetaSchema, httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const MasterFacilityUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterFacilityUpdateItemParams = z.infer<typeof MasterFacilityUpdateItemParamsSchema>

export const MasterFacilityUpdateItemBodySchema = zfd.formData({
  name: zfd.text(),
  icon: z.union([zfd.file(), z.string()]),
})
export type MasterFacilityUpdateItemBody = z.infer<typeof MasterFacilityUpdateItemBodySchema>

export const MasterFacilityUpdateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
})
export type MasterFacilityUpdateItemResult = z.infer<typeof MasterFacilityUpdateItemResultSchema>

export const MasterFacilityUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterFacilityUpdateItemResultSchema
)
export type MasterFacilityUpdateItemResponse = z.infer<typeof MasterFacilityUpdateItemResponseSchema>

export const updateItem = async <ResponseType = MasterFacilityUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterFacilityUpdateItemParams
  body: MasterFacilityUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'put',
    url: `/v1/facilities/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

// ACTIVATION FACILITY
export const MasterFacilityActivationItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterFacilityActivationItemParams = z.infer<typeof MasterFacilityActivationItemParamsSchema>

export const MasterFacilityActivationItemBodySchema = zfd.formData({ is_active: z.boolean() })
export type MasterFacilityActivationItemBody = z.infer<typeof MasterFacilityActivationItemBodySchema>

export const MasterFacilityActivationItemResponseSchema = HttpBaseResponseMetaSchema
export type MasterFacilityActivationItemResponse = z.infer<typeof MasterFacilityActivationItemResponseSchema>

export const activateItem = async <ResponseType = MasterFacilityActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterFacilityActivationItemParams
  body: MasterFacilityActivationItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'put',
    url: `/v1/facilities/${id}`,
  })
  return response?.data
}
