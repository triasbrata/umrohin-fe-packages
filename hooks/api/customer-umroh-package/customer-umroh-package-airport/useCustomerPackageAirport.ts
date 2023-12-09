import { queryKeyCustomerUmrohPackage } from '@apps/packages/lib/constants/queryKeyCustomerUmrohPackage'
import apiServices from '@apps/packages/services'
import { placeholderListFilterBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerPackageFilterAirportParams,
  CustomerPackageFilterAirportResponse,
  CustomerPackageFilterAirportResponseSchema,
} from '@apps/packages/services/customer-umroh-package/customer-umroh-package-airport'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerPackageAirportConfig = {
  queryKey?: QueryKey
  params: CustomerPackageFilterAirportParams
  options?: UseQueryOptions<CustomerPackageFilterAirportResponse>
}

export const useCustomerPackageAirport = (opt: useCustomerPackageAirportConfig) => {
  const { queryKey = [queryKeyCustomerUmrohPackage.CUSTOMER_UMROH_PACKAGE_FILTER_AIRPORT], params, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerPackageFilterAirportResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListFilterBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerPackageAirport.getAirport({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerPackageFilterAirportResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
