import { queryKeyCustomerPackageDetail } from '@apps/packages/lib/constants/queryKeyCustomerDetailPackage'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerDetailPackageAirlinesParams,
  CustomerDetailPackageAirlinesResponse,
  CustomerDetailPackageAirlinesResponseSchema,
} from '@apps/packages/services/customer-umroh-package-detail/customer-umroh-package-detail-airlines'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerDetailPackageAirlinesConfig = {
  queryKey?: QueryKey
  params: CustomerDetailPackageAirlinesParams
  options?: UseQueryOptions<CustomerDetailPackageAirlinesResponse>
}

export const useCustomerPackageDetailAirlines = (opt: useCustomerDetailPackageAirlinesConfig) => {
  const {
    queryKey = [queryKeyCustomerPackageDetail.CUSTOMER_UMROH_PACKAGE_DETAIL_AIRLINES],
    params,
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerDetailPackageAirlinesResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerDetailPackageAirlines.getDetailAirlines({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerDetailPackageAirlinesResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
