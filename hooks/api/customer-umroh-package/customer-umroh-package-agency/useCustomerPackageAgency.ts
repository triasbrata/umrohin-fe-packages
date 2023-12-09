import { queryKeyCustomerUmrohPackage } from '@apps/packages/lib/constants/queryKeyCustomerUmrohPackage'
import apiServices from '@apps/packages/services'
import { placeholderListFilterBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerPackageFilterAgencyParams,
  CustomerPackageFilterAgencyResponse,
  CustomerPackageFilterAgencyResponseSchema,
} from '@apps/packages/services/customer-umroh-package/customer-umroh-package-agency'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerPackageAgencyConfig = {
  queryKey?: QueryKey
  params: CustomerPackageFilterAgencyParams
  options?: UseQueryOptions<CustomerPackageFilterAgencyResponse>
}

export const useCustomerPackageAgency = (opt: useCustomerPackageAgencyConfig) => {
  const { queryKey = [queryKeyCustomerUmrohPackage.CUSTOMER_UMROH_PACKAGE_FILTER_AGENCY], params, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerPackageFilterAgencyResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListFilterBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerPackageAgency.getAgency({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerPackageFilterAgencyResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
