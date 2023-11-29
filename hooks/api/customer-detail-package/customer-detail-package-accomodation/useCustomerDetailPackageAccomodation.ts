import { queryKeyCustomerPackageDetail } from '@apps/packages/lib/constants/queryKeyCustomerDetailPackage'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerDetailPackageAccomodationParams,
  CustomerDetailPackageAccomodationResponse,
  CustomerDetailPackageAccomodationResponseSchema,
} from '@apps/packages/services/customer-umroh-package-detail/customer-umroh-package-detail-accomodation'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerDetailPackageAccomodationConfig = {
  queryKey?: QueryKey
  params: CustomerDetailPackageAccomodationParams
  options?: UseQueryOptions<CustomerDetailPackageAccomodationResponse>
}

export const useCustomerPackageDetailAccomodation = (opt: useCustomerDetailPackageAccomodationConfig) => {
  const {
    queryKey = [queryKeyCustomerPackageDetail.CUSTOMER_UMROH_PACKAGE_DETAIL_ACCOMODATION],
    params,
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerDetailPackageAccomodationResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerDetailPackageAccomodation.getDetailAccomodation({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerDetailPackageAccomodationResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
