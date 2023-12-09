import { queryKeyCustomerUmrohPackage } from '@apps/packages/lib/constants/queryKeyCustomerUmrohPackage'
import apiServices from '@apps/packages/services'
import { placeholderListFilterBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerPackageFilterTourLeadersParams,
  CustomerPackageFilterTourLeadersResponse,
  CustomerPackageFilterTourLeadersResponseSchema,
} from '@apps/packages/services/customer-umroh-package/customer-umroh-package-tour-leaders'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerPackageTourLeadersConfig = {
  queryKey?: QueryKey
  params: CustomerPackageFilterTourLeadersParams
  options?: UseQueryOptions<CustomerPackageFilterTourLeadersResponse>
}

export const useCustomerPackageTourLeaders = (opt: useCustomerPackageTourLeadersConfig) => {
  const {
    queryKey = [queryKeyCustomerUmrohPackage.CUSTOMER_UMROH_PACKAGE_FILTER_TOUR_LEADERS],
    params,
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerPackageFilterTourLeadersResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListFilterBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerPackageTourLeaders.getTourLeaders({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerPackageFilterTourLeadersResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
