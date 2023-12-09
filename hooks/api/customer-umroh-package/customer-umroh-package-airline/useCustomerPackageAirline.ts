import { queryKeyCustomerUmrohPackage } from '@apps/packages/lib/constants/queryKeyCustomerUmrohPackage'
import apiServices from '@apps/packages/services'
import { placeholderListFilterBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerPackageFilterAirlineParams,
  CustomerPackageFilterAirlineResponse,
  CustomerPackageFilterAirlineResponseSchema,
} from '@apps/packages/services/customer-umroh-package/customer-umroh-package-airline'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerPackageAirlineConfig = {
  queryKey?: QueryKey
  params: CustomerPackageFilterAirlineParams
  options?: UseQueryOptions<CustomerPackageFilterAirlineResponse>
}

export const useCustomerPackageAirline = (opt: useCustomerPackageAirlineConfig) => {
  const { queryKey = [queryKeyCustomerUmrohPackage.CUSTOMER_UMROH_PACKAGE_FILTER_AIRLINE], params, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerPackageFilterAirlineResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListFilterBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerPackageAirline.getAirline({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerPackageFilterAirlineResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
