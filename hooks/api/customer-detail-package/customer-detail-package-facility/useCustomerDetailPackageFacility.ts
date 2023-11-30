import { queryKeyCustomerPackageDetail } from '@apps/packages/lib/constants/queryKeyCustomerDetailPackage'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerDetailPackageFacilityParams,
  CustomerDetailPackageFacilityResponse,
  CustomerDetailPackageFacilityResponseSchema,
} from '@apps/packages/services/customer-umroh-package-detail/customer-umroh-package-detail-facility'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerDetailPackageFacilityConfig = {
  queryKey?: QueryKey
  params: CustomerDetailPackageFacilityParams
  options?: UseQueryOptions<CustomerDetailPackageFacilityResponse>
}

export const useCustomerPackageDetailFacility = (opt: useCustomerDetailPackageFacilityConfig) => {
  const {
    queryKey = [queryKeyCustomerPackageDetail.CUSTOMER_UMROH_PACKAGE_DETAIL_FACILITY],
    params,
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerDetailPackageFacilityResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerDetailPackageFacility.getDetailFacility({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerDetailPackageFacilityResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
