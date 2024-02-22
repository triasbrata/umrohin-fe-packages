import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { PackageDetailResponse } from '.'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/packages`

export const PackageUpdateItemParamsSchema = z.object({ id: z.number() })

export type PackageUpdateItemParams = z.infer<typeof PackageUpdateItemParamsSchema>

export const PackageUpdateItemBodySchema = zfd.formData({
  name: z.string(),
  agency_id: z.string(),
  is_package_plus: z.boolean(),
  is_highlight: z.boolean(),
  thematic_id: z.number(),
  desc: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.literal(-1), z.literal(2), z.boolean()]),
  package_schedules: z.array(
    z.object({
      start_date: z.string(),
      end_date: z.string(),
    })
  ),
  package_prices: z.array(
    z.object({
      bed_type: z.string(),
      price: z.number(),
    })
  ),
  package_airlines: z.array(
    z.object({
      airlines_id: z.string(),
      origin_airport_id: z.string(),
      dest_airport_id: z.string(),
      time_estimation: z.string(),
    })
  ),
  tour_locations: z.array(z.number()),
  package_accomodations: z.array(z.number()),
  package_facilities: z.array(z.number()),
  package_tour_leaders: z.array(z.number()),
})

export type PackageUpdateItemBody = z.infer<typeof PackageUpdateItemBodySchema>

export const PackageUpdateImageSchema = zfd.formData({
  thumbnail: z.union([zfd.file(), z.string()]).optional(),
  gallery: z.array(z.union([zfd.file(), z.string()])),
  deleted: z.array(z.string()),
})

export type PackageUpdateImage = z.infer<typeof PackageUpdateImageSchema>

export const PackageUpdateItemResultSchema = z.object({
  package_id: z.string(),
  name: z.string(),
  desc: z.string().optional(),
  is_highlight: z.boolean(),
  thumbnail: z.string(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.literal(2), z.boolean()]),
})

export type PackageUpdateItemResult = z.infer<typeof PackageUpdateItemResultSchema>

export const PackageUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(PackageUpdateItemResultSchema)

export type PackageUpdateItemResponse = z.infer<typeof PackageUpdateItemResponseSchema>

export const updateItem = async <ResponseType = PackageDetailResponse>({
  params,
  body,
  options,
}: {
  params: PackageUpdateItemParams
  body: PackageUpdateItemBody & PackageUpdateImage
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const { gallery, thumbnail, deleted, ...payload } = body
  const formData = new FormData()
  gallery.forEach((g) => {
    formData.append('gallery[]', g)
  })
  formData.append('thumbnail', thumbnail ?? '')
  deleted.forEach((g) => {
    formData.append('deleted[]', g)
  })
  await apiCall({
    data: formData,
    ...options,
    method: 'patch',
    url: `${endpointUrl}/${id}/images`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: payload,
    ...options,
    method: 'patch',
    url: `${endpointUrl}/${id}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
  return response?.data
}

export const PackageActivationItemParamsSchema = z.object({ id: z.number() })

export type PackageActivationItemParams = z.infer<typeof PackageActivationItemParamsSchema>

export const PackageActivationItemBodySchema = z.object({
  status: z.union([z.literal(0), z.literal(1), z.literal(2), z.boolean()]),
})

export type PackageActivationItemBody = z.infer<typeof PackageActivationItemBodySchema>

export const PackageActivationItemResultSchema = z.object({
  tour_leader_id: z.string(),
  name: z.string(),
  desc: z.string().optional(),
  is_highlight: z.boolean(),
  thumbnail: z.string(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.literal(2), z.boolean()]),
})

export type PackageActivationItemResult = z.infer<typeof PackageActivationItemResultSchema>

export const PackageActivationItemResponseSchema = httpGetDetailResponseSchemaBuilder(PackageActivationItemResultSchema)

export type PackageActivationItemResponse = z.infer<typeof PackageActivationItemResponseSchema>

export const activationItem = async <ResponseType = PackageActivationItemResponse>({
  params,
  body,
  options,
}: {
  params: PackageActivationItemParams
  body: PackageActivationItemBody
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
