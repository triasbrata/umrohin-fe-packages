import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetListResponseSchemaBuilder } from '../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/homepage/search/packages`
const endpointFilterUrl = `${common.ROOT_ENDPOINT}/homepage/search/filters`

export const CustomerUmrohPackageParamsSchema = z.object({
  plus: z.string().optional(),
  months: z.string().optional(),
  thematics: z.string().optional(),
  agency: z.number().optional(),
  airlines: z.string().optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  hotels: z.string().optional(),
  airports: z.string().optional(),
  facility: z.string().optional(),
  tourLeader: z.number().optional(),
  page: z.number().optional(),
  page_size: z.number().optional(),
  or: z.string().optional(),
  ob: z.string().optional(),
})

export type CustomerUmrohPackageParams = z.infer<typeof CustomerUmrohPackageParamsSchema>

export const CustomerUmrohPackageItemSchema = z.object({
  package_id: z.string(),
  package_name: z.string(),
  agency_name: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  price: z.number(),
  image: z.string(),
})

export type CustomerUmrohPackageItem = z.infer<typeof CustomerUmrohPackageItemSchema>

export const CustomerUmrohPackageResponseSchema = httpGetListResponseSchemaBuilder(CustomerUmrohPackageItemSchema)

export type CustomerUmrohPackageResponse = z.infer<typeof CustomerUmrohPackageResponseSchema>

export const getList = async <ResponseType = CustomerUmrohPackageResponse>({
  params,
  options,
}: {
  params: CustomerUmrohPackageParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: endpointUrl,
  })
  return response?.data
}

export const CustomerUmrohPackageFilterSchema = z.object({
  plus_packages: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      image: z.string(),
      total: z.number(),
    })
  ),
  thematic: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      total: z.number(),
    })
  ),
  agencies: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      image: z.string().optional(),
    })
  ),
  airlines: z.array(
    z.object({
      id: z.number(),
      title: z.object({
        name: z.string(),
        iataCode: z.string(),
      }),
    })
  ),
  airports: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
    })
  ),
  facilities: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
    })
  ),
  tour_leaders: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      image: z.string().optional(),
      total: z.number().optional(),
    })
  ),
})

export type CustomerUmrohPackageFilter = z.infer<typeof CustomerUmrohPackageFilterSchema>

export const CustomerUmrohPackageFilterResponseSchema = httpGetListResponseSchemaBuilder(
  CustomerUmrohPackageFilterSchema
)

export type CustomerUmrohPackageFilterResponse = z.infer<typeof CustomerUmrohPackageFilterResponseSchema>

export const getFilter = async <ResponseType = CustomerUmrohPackageFilterResponse>({
  params,
  options,
}: {
  params: object
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: endpointFilterUrl,
  })
  return response?.data
}
