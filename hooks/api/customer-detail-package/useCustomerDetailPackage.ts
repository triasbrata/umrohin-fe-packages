import { queryKeyCustomerPackageDetail } from '@apps/packages/lib/constants/queryKeyCustomerDetailPackage'
import apiServices from '@apps/packages/services'
import { placeholderDetailBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerDetailPackageParams,
  CustomerDetailPackageResponse,
  CustomerDetailPackageResponseSchema,
} from '@apps/packages/services/customer-umroh-package-detail'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerDetailPackageConfig = {
  queryKey?: QueryKey
  params: CustomerDetailPackageParams
  options?: UseQueryOptions<CustomerDetailPackageResponse>
}

export const useCustomerPackageDetail = (opt: useCustomerDetailPackageConfig) => {
  const { queryKey = [queryKeyCustomerPackageDetail.CUSTOMER_UMROH_PACKAGE_DETAIL], params, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerDetailPackageResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderDetailBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerDetailPackage.getDetail({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerDetailPackageResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
