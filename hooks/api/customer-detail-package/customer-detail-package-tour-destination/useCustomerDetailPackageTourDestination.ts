import { queryKeyCustomerPackageDetail } from '@apps/packages/lib/constants/queryKeyCustomerDetailPackage'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerDetailPackageTourDestinationParams,
  CustomerDetailPackageTourDestinationResponse,
  CustomerDetailPackageTourDestinationResponseSchema,
} from '@apps/packages/services/customer-umroh-package-detail/customer-umroh-package-detail-tour-destination'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerDetailPackageTourDestinationConfig = {
  queryKey?: QueryKey
  params: CustomerDetailPackageTourDestinationParams
  options?: UseQueryOptions<CustomerDetailPackageTourDestinationResponse>
}

export const useCustomerPackageDetailTourDestination = (opt: useCustomerDetailPackageTourDestinationConfig) => {
  const {
    queryKey = [queryKeyCustomerPackageDetail.CUSTOMER_UMROH_PACKAGE_DETAIL_TOUR_DESTINATION],
    params,
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerDetailPackageTourDestinationResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerDetailPackageTourDestination.getDetailTourDestination({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerDetailPackageTourDestinationResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
