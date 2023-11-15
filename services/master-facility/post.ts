import { common } from '@apps/split/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { httpGetDetailResponseSchemaBuilder } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/facility`

export const MasterFacilityCreateItemBodySchema = zfd.formData({
  icon: zfd.file(),
  name: zfd.text(),
  desc: zfd.text(),
})

export type MasterFacilityCreateItemBody = z.infer<typeof MasterFacilityCreateItemBodySchema>

export const MasterFacilityCreateItemResultSchema = z.object({
  facility_id: z.string(),
  name: z.string(),
  desc: z.string(),
  icon: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
})

export type MasterFacilityCreateItemResult = z.infer<typeof MasterFacilityCreateItemResultSchema>

export const MasterFacilityCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterFacilityCreateItemResultSchema.nullable()
)

export type MasterFacilityCreateItemResponse = z.infer<typeof MasterFacilityCreateItemResponseSchema>

export const createItem = async <ResponseType = MasterFacilityCreateItemResponse>({
  body,
  options,
}: {
  body: MasterFacilityCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

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
