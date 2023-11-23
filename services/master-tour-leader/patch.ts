import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/tour-leader`

export const TourLeaderUpdateItemParamsSchema = z.object({ id: z.number() })

export type TourLeaderUpdateItemParams = z.infer<typeof TourLeaderUpdateItemParamsSchema>

export const TourLeaderUpdateItemBodySchema = zfd.formData({
  name: zfd.text(),
  desc: zfd.text().optional(),
  image: z.union([zfd.file(), z.string()]),
  thumbnail: z.union([zfd.file(), z.string()]),
})

export type TourLeaderUpdateItemBody = z.infer<typeof TourLeaderUpdateItemBodySchema>

export const TourLeaderUpdateItemResultSchema = z.object({
  tour_leader_id: z.number(),
  name: z.string(),
  desc: z.string().optional(),
  is_highglight: z.boolean(),
  thumbnail: z.string(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type TourLeaderUpdateItemResult = z.infer<typeof TourLeaderUpdateItemResultSchema>

export const TourLeaderUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(TourLeaderUpdateItemResultSchema)

export type TourLeaderUpdateItemResponse = z.infer<typeof TourLeaderUpdateItemResponseSchema>

export const updateItem = async <ResponseType = TourLeaderUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: TourLeaderUpdateItemParams
  body: TourLeaderUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'patch',
    url: `${endpointUrl}/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

export const TourLeaderActivationItemParamsSchema = z.object({ id: z.number() })

export type TourLeaderActivationItemParams = z.infer<typeof TourLeaderActivationItemParamsSchema>

export const TourLeaderActivationItemBodySchema = z.object({
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type TourLeaderActivationItemBody = z.infer<typeof TourLeaderActivationItemBodySchema>

export const TourLeaderActivationItemResultSchema = z.object({
  tour_leader_id: z.number(),
  name: z.string(),
  desc: z.string().optional(),
  is_highglight: z.boolean(),
  thumbnail: z.string(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type TourLeaderActivationItemResult = z.infer<typeof TourLeaderActivationItemResultSchema>

export const TourLeaderActivationItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  TourLeaderActivationItemResultSchema
)

export type TourLeaderActivationItemResponse = z.infer<typeof TourLeaderActivationItemResponseSchema>

export const activationItem = async <ResponseType = TourLeaderActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: TourLeaderActivationItemParams
  body: TourLeaderActivationItemBody
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
