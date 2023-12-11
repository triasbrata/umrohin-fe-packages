import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { PackageDetailResponse } from './get'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/packages`

export const PackageCreateItemBodySchema = zfd.formData({
  name: z.string(),
  agency_id: z.string(),
  is_package_plus: z.boolean(),
  is_highlight: z.boolean(),
  thematic_id: z.string(),
  desc: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.literal(-1), z.boolean()]),
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
  tour_locations: z.array(z.string()),
  package_accomodations: z.array(z.string()),
  package_facilities: z.array(z.string()),
  package_tour_leaders: z.array(z.string()),
})

export type PackageCreateItemBody = z.infer<typeof PackageCreateItemBodySchema>

export const createItem = async <ResponseType = PackageDetailResponse>({
  body,
  options,
}: {
  body: PackageCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: endpointUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
  return response?.data
}
