import { queryKeyCustomerUmrohPackage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerUmrohPackageFilterResponse,
  CustomerUmrohPackageFilterResponseSchema,
} from '@apps/packages/services/customer-umroh-package'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerUmrohPackageFilterConfig = {
  queryKey?: QueryKey
  params?: object
  options?: UseQueryOptions<CustomerUmrohPackageFilterResponse>
}

export const useCustomerUmrohPackageFilter = (opt?: useCustomerUmrohPackageFilterConfig) => {
  const { queryKey = [queryKeyCustomerUmrohPackage.CUSTOMER_UMROH_PACKAGE_FILTER], params = {}, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerUmrohPackageFilterResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerUmrohPackage.getFilter({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerUmrohPackageFilterResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
