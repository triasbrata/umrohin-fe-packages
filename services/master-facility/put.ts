import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { httpGetDetailResponseSchemaBuilder } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/facility`

export const MasterFacilityUpdateItemParamsSchema = z.object({ id: z.number() })

export type MasterFacilityUpdateItemParams = z.infer<typeof MasterFacilityUpdateItemParamsSchema>

export const MasterFacilityUpdateItemBodySchema = zfd.formData({
  icon: z.union([zfd.file(), z.string()]),
  name: zfd.text(),
  desc: zfd.text(),
})

export type MasterFacilityUpdateItemBody = z.infer<typeof MasterFacilityUpdateItemBodySchema>

export const MasterFacilityUpdateItemResultSchema = z.object({
  facility_id: z.string(),
  name: z.string(),
  desc: z.string(),
  icon: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
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
    url: `${endpointUrl}/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
