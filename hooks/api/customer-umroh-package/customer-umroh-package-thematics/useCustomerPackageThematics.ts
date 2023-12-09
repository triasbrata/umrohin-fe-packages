import { queryKeyCustomerUmrohPackage } from '@apps/packages/lib/constants/queryKeyCustomerUmrohPackage'
import apiServices from '@apps/packages/services'
import { placeholderListFilterBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerPackageFilterThematicsParams,
  CustomerPackageFilterThematicsResponse,
  CustomerPackageFilterThematicsResponseSchema,
} from '@apps/packages/services/customer-umroh-package/customer-umroh-package-thematics'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerPackageThematicsConfig = {
  queryKey?: QueryKey
  params: CustomerPackageFilterThematicsParams
  options?: UseQueryOptions<CustomerPackageFilterThematicsResponse>
}

export const useCustomerPackageThematics = (opt: useCustomerPackageThematicsConfig) => {
  const {
    queryKey = [queryKeyCustomerUmrohPackage.CUSTOMER_UMROH_PACKAGE_FILTER_THEMATICS],
    params,
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerPackageFilterThematicsResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListFilterBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerPackageThematics.getThematics({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerPackageFilterThematicsResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
