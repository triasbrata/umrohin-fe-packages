import { queryKeyPackageHotelVendor } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  PackageHotelVendorListParams,
  PackageHotelVendorListResponse,
  PackageHotelVendorListResponseSchema,
} from '@apps/packages/services/package-hotel-vendor'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type usePackageHotelVendorListConfig = {
  queryKey?: QueryKey
  params?: PackageHotelVendorListParams
  options?: UseQueryOptions<PackageHotelVendorListResponse>
}

export const usePackageHotelVendorList = (opt?: usePackageHotelVendorListConfig) => {
  const {
    queryKey = [queryKeyPackageHotelVendor.PACKAGE_HOTEL_VENDOR_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: PackageHotelVendorListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.packageHotelVendor.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: PackageHotelVendorListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
