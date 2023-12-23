import { common } from '@apps/packages/lib/constants'
import {
  httpGetDetailResponseSchemaBuilder,
  httpGetListResponseSchemaBuilder,
} from '@apps/packages/services/BaseResponse'
import { UploadFile } from 'antd'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'
import { MasterFacilityListItemSchema } from '../master-facility'
import { MasterHotelListItemSchema } from '../master-hotel'
import { ThematicListItemSchema } from '../master-thematics'
import { MasterTourLeaderListItemSchema } from '../master-tour-leader'
import { MasterTourLocationListItemSchema } from '../master-tour-location'
import { MitraAgencyListItemSchema } from '../mitra-agency'

const endpointUrl = `${common.ROOT_ENDPOINT}/packages`
export const PackageDepartureDateItemSchema = z.object({
  start_date: z.string(),
  end_date: z.string(),
})

export type PackageDepartureDateItem = z.infer<typeof PackageDepartureDateItemSchema>

export const PackageAirlinesItemSchema = z.object({
  id: z.string(),
  airlines: z.object({
    airlines_id: z.string(),
    name: z.string(),
  }),
  departure: z.object({
    airport: z.object({
      airport_id: z.string(),
      name: z.string(),
      code: z.string(),
    }),
    city: z.object({
      city_id: z.string(),
      city_name: z.string().optional(),
    }),
  }),
  arrival: z.object({
    airport: z.object({
      airport_id: z.string(),
      name: z.string(),
      code: z.string(),
    }),
    city: z.object({
      city_id: z.string(),
      city_name: z.string().optional(),
    }),
  }),
  flightDuration: z.string(),
})

export type PackageAirlinesItem = z.infer<typeof PackageAirlinesItemSchema>

export const PackageRoomItemSchema = z.object({
  name: z.string(),
  price: z.number(),
})

export type PackageRoomItem = z.infer<typeof PackageRoomItemSchema>

export const PackageFormItemSchema = z.object({
  id: z.string(),
  package_id: z.string(),
  package_name: z.string(),
  agency: MitraAgencyListItemSchema.optional(),
  thematic: ThematicListItemSchema.optional(),
  departure_date: z.array(PackageDepartureDateItemSchema),
  airlines: z.array(PackageAirlinesItemSchema),
  hotels: z.array(MasterHotelListItemSchema),
  rooms: z.array(PackageRoomItemSchema),
  tour_locations: z.array(MasterTourLocationListItemSchema),
  tour_leaders: z.array(MasterTourLeaderListItemSchema),
  facilities: z.array(MasterFacilityListItemSchema),
  description: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(-1)]),
  thumbnail: z.custom<UploadFile[]>(),
  galleries: z.array(z.object({ image: z.custom<UploadFile[]>() })),
})

export type PackageFormItem = z.infer<typeof PackageFormItemSchema>

export const PackageListParamsSchema = z.object({
  page: z.number().optional(),
  page_size: z.number().optional(),
  name: z.string().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type PackageListParams = z.infer<typeof PackageListParamsSchema>

export const PackageDetailParamsSchema = z.object({ id: z.number() })

export type PackageDetailParams = z.infer<typeof PackageDetailParamsSchema>

export const PackageAgencySchema = z.object({
  agency_id: z.string(),
  name: z.string(),
  address: z.string(),
  image: z.string(),
  business_certificate_number: z.string(),
  business_certificate_year: z.number(),
})

export const PackageThematicSchema = z.object({
  thematic_id: z.string(),
  name: z.string(),
  desc: z.string(),
  image: z.string(),
})

export const PackageListItemSchema = z.object({
  package_id: z.string(),
  name: z.string(),
  thematic: z.union([z.string(), z.null()]),
  status: z.union([z.literal(0), z.literal(1), z.literal(2), z.boolean()]),
  is_highlight: z.boolean(),
  agency_id: z.string(),
  agency_name: z.string(),
  package_schedules: z.array(
    z.object({
      start_date: z.string(),
      end_date: z.string(),
    })
  ),
  package_destinations: z.array(z.string()),
  package_prices: z.array(
    z.object({
      bed_type: z.string(),
      price: z.string(),
    })
  ),
  package_tour_leaders: z.array(z.string()),
  package_hotels: z.array(
    z.object({
      city_name: z.string(),
      name: z.string(),
      star: z.number(),
    })
  ),
  package_airlines: z.array(z.string()),
})

export type PackageListItem = z.infer<typeof PackageListItemSchema>

export const PackageListResponseSchema = httpGetListResponseSchemaBuilder(PackageListItemSchema)

export type PackageListResponse = z.infer<typeof PackageListResponseSchema>

export const PackageDetailItemSchema = z.object({
  package_id: z.string(),
  name: z.string(),
  is_package_plus: z.boolean(),
  desc: z.union([z.string(), z.null()]),
  status: z.union([z.literal(0), z.literal(1), z.literal(2), z.boolean()]),
  is_highlight: z.boolean(),
  agency: PackageAgencySchema,
  thematic: PackageThematicSchema,
  package_schedules: z.array(
    z.object({
      id: z.string(),
      start_date: z.string(),
      end_date: z.string(),
      status: z.union([z.literal(0), z.literal(1), z.boolean()]),
    })
  ),
  package_destinations: z.array(
    z.object({
      id: z.string(),
      tour_location_id: z.string(),
      name: z.string(),
      city: z.string(),
      country: z.string(),
      image: z.string(),
      status: z.union([z.literal(0), z.literal(1), z.boolean()]),
    })
  ),
  package_prices: z.array(
    z.object({
      bed_type: z.string(),
      id: z.string(),
      price: z.number(),
      status: z.union([z.literal(0), z.literal(1), z.boolean()]),
    })
  ),
  package_tour_leaders: z.array(
    z.object({
      id: z.string(),
      tour_leader_id: z.string(),
      name: z.string(),
      desc: z.string(),
      image: z.string(),
      status: z.union([z.literal(0), z.literal(1), z.boolean()]),
    })
  ),
  package_hotels: z.array(
    z.object({
      id: z.string(),
      accommodation_id: z.string(),
      city_name: z.string(),
      province_name: z.string(),
      country_name: z.string(),
      name: z.string(),
      star: z.number(),
      status: z.union([z.literal(0), z.literal(1), z.boolean()]),
    })
  ),
  package_facilities: z.array(
    z.object({
      id: z.string(),
      facility_id: z.string(),
      name: z.string(),
      desc: z.string(),
      icon: z.string(),
      status: z.union([z.literal(0), z.literal(1), z.boolean()]),
    })
  ),
  package_airlines: z.array(
    z.object({
      id: z.string(),
      airline: z.string(),
      airlines_id: z.string(),
      dest_airport_city_id: z.string(),
      dest_airport_id: z.string(),
      dest_airport_code: z.string(),
      dest_airport_name: z.string(),
      origin_airport_city_id: z.string(),
      origin_airport_id: z.string(),
      origin_airport_code: z.string(),
      origin_airport_name: z.string(),
      time_estimation: z.string(),
      status: z.union([z.literal(0), z.literal(1), z.boolean()]),
    })
  ),
  package_images: z.object({
    flyer: z.string(),
    gallery: z.array(z.string()),
  }),
})

export type PackageDetailItem = z.infer<typeof PackageDetailItemSchema>

export const PackageDetailResponseSchema = httpGetDetailResponseSchemaBuilder(PackageDetailItemSchema)

export type PackageDetailResponse = z.infer<typeof PackageDetailResponseSchema>

export const getList = async <ResponseType = PackageListResponse>({
  params,
  options,
}: {
  params: PackageListParams
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

export const getDetail = async <ResponseType = PackageDetailResponse>({
  params,
  options,
}: {
  params: PackageDetailParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `${endpointUrl}/${id}`,
  })
  return response?.data
}
