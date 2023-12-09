import { queryKeyCustomerUmrohPackage } from '@apps/packages/lib/constants/queryKeyCustomerUmrohPackage'
import apiServices from '@apps/packages/services'
import { placeholderListFilterBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerPackageFilterTourDestinationsParams,
  CustomerPackageFilterTourDestinationsResponse,
  CustomerPackageFilterTourDestinationsResponseSchema,
} from '@apps/packages/services/customer-umroh-package/customer-umroh-package-tour-destinations'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerPackageTourDestinationsConfig = {
  queryKey?: QueryKey
  params: CustomerPackageFilterTourDestinationsParams
  options?: UseQueryOptions<CustomerPackageFilterTourDestinationsResponse>
}

export const useCustomerPackageTourDestinations = (opt: useCustomerPackageTourDestinationsConfig) => {
  const {
    queryKey = [queryKeyCustomerUmrohPackage.CUSTOMER_UMROH_PACKAGE_FILTER_TOUR_DESTINATIONS],
    params,
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerPackageFilterTourDestinationsResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListFilterBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerPackageTourDestinations.getTourDestinations({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerPackageFilterTourDestinationsResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
