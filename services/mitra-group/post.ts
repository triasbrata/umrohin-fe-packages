import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/group`

export const MitraGroupCreateItemBodySchema = zfd.formData({
  name: zfd.text(),
  file: zfd.file(),
  startTime: zfd.text(),
  endTime: zfd.text(),
  desc: zfd.text().optional(),
  group_total: z.number().optional(),
})

export type MitraGroupCreateItemBody = z.infer<typeof MitraGroupCreateItemBodySchema>

export const MitraGroupCreateItemResultSchema = z.object({
  umroh_group_id: z.string(),
  name: z.string(),
  tour_leader_total: z.number().optional(),
  tour_guide_total: z.number().optional(),
  tour_member_total: z.number().optional(),
  group_total: z.number().optional(),
  desc: z.string().optional().optional(),
  file: z.string().optional().optional(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MitraGroupCreateItemResult = z.infer<typeof MitraGroupCreateItemResultSchema>

export const MitraGroupCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(MitraGroupCreateItemResultSchema)

export type MitraGroupCreateItemResponse = z.infer<typeof MitraGroupCreateItemResponseSchema>

export const createItem = async <ResponseType = MitraGroupCreateItemResponse>({
  body,
  options,
}: {
  body: MitraGroupCreateItemBody
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
