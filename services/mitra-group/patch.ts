import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/group`

export const MitraGroupUpdateItemParamsSchema = z.object({ id: z.number() })

export type MitraGroupUpdateItemParams = z.infer<typeof MitraGroupUpdateItemParamsSchema>

export const MitraGroupUpdateItemBodySchema = zfd.formData({
  name: zfd.text(),
  file: z.union([zfd.file(), z.string()]),
  start: zfd.text(),
  end: zfd.text(),
  desc: zfd.text().optional(),
  smallGroup: z.number().optional(),
})

export type MitraGroupUpdateItemBody = z.infer<typeof MitraGroupUpdateItemBodySchema>

export const MitraGroupUpdateItemResultSchema = z.object({
  umroh_group_id: z.string(),
  name: z.string(),
  count_tour_leader: z.number().optional(),
  count_tour_guide: z.number().optional(),
  count_member: z.number().optional(),
  smallGroup: z.number().optional(),
  desc: z.string().optional().optional(),
  file: z.string().optional().optional(),
  start: z.string(),
  end: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MitraGroupUpdateItemResult = z.infer<typeof MitraGroupUpdateItemResultSchema>

export const MitraGroupUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(MitraGroupUpdateItemResultSchema)

export type MitraGroupUpdateItemResponse = z.infer<typeof MitraGroupUpdateItemResponseSchema>

export const updateItem = async <ResponseType = MitraGroupUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: MitraGroupUpdateItemParams
  body: MitraGroupUpdateItemBody
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

export const MitraGroupActivationItemParamsSchema = z.object({ id: z.number() })

export type MitraGroupActivationItemParams = z.infer<typeof MitraGroupActivationItemParamsSchema>

export const MitraGroupActivationItemBodySchema = z.object({
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MitraGroupActivationItemBody = z.infer<typeof MitraGroupActivationItemBodySchema>

export const MitraGroupActivationItemResultSchema = z.object({
  umroh_group_id: z.string(),
  name: z.string(),
  count_tour_leader: z.number().optional(),
  count_tour_guide: z.number().optional(),
  count_member: z.number().optional(),
  smallGroup: z.number().optional(),
  desc: z.string().optional().optional(),
  file: z.string().optional().optional(),
  start: z.string(),
  end: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type MitraGroupActivationItemResult = z.infer<typeof MitraGroupActivationItemResultSchema>

export const MitraGroupActivationItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MitraGroupActivationItemResultSchema
)

export type MitraGroupActivationItemResponse = z.infer<typeof MitraGroupActivationItemResponseSchema>

export const activationItem = async <ResponseType = MitraGroupActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: MitraGroupActivationItemParams
  body: MitraGroupActivationItemBody
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
