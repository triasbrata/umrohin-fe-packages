import { queryKeyCustomerPackageDetail } from '@apps/packages/lib/constants/queryKeyCustomerDetailPackage'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerDetailPackageImageParams,
  CustomerDetailPackageImageResponse,
  CustomerDetailPackageImageResponseSchema,
} from '@apps/packages/services/customer-umroh-package-detail/customer-umroh-package-detail-image'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerDetailPackageImageConfig = {
  queryKey?: QueryKey
  params: CustomerDetailPackageImageParams
  options?: UseQueryOptions<CustomerDetailPackageImageResponse>
}

export const useCustomerPackageDetailImage = (opt: useCustomerDetailPackageImageConfig) => {
  const { queryKey = [queryKeyCustomerPackageDetail.CUSTOMER_UMROH_PACKAGE_DETAIL_IMAGE], params, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerDetailPackageImageResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerDetailPackageImage.getDetailImage({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerDetailPackageImageResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
