import { queryKeyCustomerUmrohPackage } from '@apps/packages/lib/constants/queryKeyCustomerUmrohPackage'
import apiServices from '@apps/packages/services'
import { placeholderListFilterBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerPackageFilterFacilityParams,
  CustomerPackageFilterFacilityResponse,
  CustomerPackageFilterFacilityResponseSchema,
} from '@apps/packages/services/customer-umroh-package/customer-umroh-package-facility'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerPackageFacilityConfig = {
  queryKey?: QueryKey
  params: CustomerPackageFilterFacilityParams
  options?: UseQueryOptions<CustomerPackageFilterFacilityResponse>
}

export const useCustomerPackageFacility = (opt: useCustomerPackageFacilityConfig) => {
  const {
    queryKey = [queryKeyCustomerUmrohPackage.CUSTOMER_UMROH_PACKAGE_FILTER_FACILITY],
    params,
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerPackageFilterFacilityResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListFilterBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerPackageFacility.getFacility({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerPackageFilterFacilityResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
