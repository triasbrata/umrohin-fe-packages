import { queryKeyCustomerPackageDetail } from '@apps/packages/lib/constants/queryKeyCustomerDetailPackage'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerDetailPackagePriceParams,
  CustomerDetailPackagePriceResponse,
  CustomerDetailPackagePriceResponseSchema,
} from '@apps/packages/services/customer-umroh-package-detail/customer-umroh-package-detail-price'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerDetailPackagePriceConfig = {
  queryKey?: QueryKey
  params: CustomerDetailPackagePriceParams
  options?: UseQueryOptions<CustomerDetailPackagePriceResponse>
}

export const useCustomerPackageDetailPrice = (opt: useCustomerDetailPackagePriceConfig) => {
  const { queryKey = [queryKeyCustomerPackageDetail.CUSTOMER_UMROH_PACKAGE_DETAIL_PRICE], params, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerDetailPackagePriceResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerDetailPackagePrice.getDetailPrice({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerDetailPackagePriceResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
