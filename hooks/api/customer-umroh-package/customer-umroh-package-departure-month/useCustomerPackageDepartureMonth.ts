import { queryKeyCustomerUmrohPackage } from '@apps/packages/lib/constants/queryKeyCustomerUmrohPackage'
import apiServices from '@apps/packages/services'
import { placeholderListFilterBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerPackageFilterDepartureMonthParams,
  CustomerPackageFilterDepartureMonthResponse,
  CustomerPackageFilterDepartureMonthResponseSchema,
} from '@apps/packages/services/customer-umroh-package/customer-umroh-package-departure-month'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerPackageDepartureMonthConfig = {
  queryKey?: QueryKey
  params: CustomerPackageFilterDepartureMonthParams
  options?: UseQueryOptions<CustomerPackageFilterDepartureMonthResponse>
}

export const useCustomerPackageDepartureMonth = (opt: useCustomerPackageDepartureMonthConfig) => {
  const {
    queryKey = [queryKeyCustomerUmrohPackage.CUSTOMER_UMROH_PACKAGE_FILTER_DEPARTURE_MONTH],
    params,
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerPackageFilterDepartureMonthResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListFilterBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerPackageDepartureMonth.getDepartureMonth({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerPackageFilterDepartureMonthResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
