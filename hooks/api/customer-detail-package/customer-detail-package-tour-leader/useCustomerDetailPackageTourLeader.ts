import { queryKeyCustomerPackageDetail } from '@apps/packages/lib/constants/queryKeyCustomerDetailPackage'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerDetailPackageTourLeaderParams,
  CustomerDetailPackageTourLeaderResponse,
  CustomerDetailPackageTourLeaderResponseSchema,
} from '@apps/packages/services/customer-umroh-package-detail/customer-umroh-package-detail-tour-leader'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerDetailPackageTourLeaderConfig = {
  queryKey?: QueryKey
  params: CustomerDetailPackageTourLeaderParams
  options?: UseQueryOptions<CustomerDetailPackageTourLeaderResponse>
}

export const useCustomerPackageDetailTourLeader = (opt: useCustomerDetailPackageTourLeaderConfig) => {
  const {
    queryKey = [queryKeyCustomerPackageDetail.CUSTOMER_UMROH_PACKAGE_DETAIL_TOUR_DESTINATION],
    params,
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerDetailPackageTourLeaderResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerDetailPackageTourLeader.getDetailTourLeader({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerDetailPackageTourLeaderResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
