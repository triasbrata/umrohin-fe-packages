import { queryKeyCustomerPackageDetail } from '@apps/packages/lib/constants/queryKeyCustomerDetailPackage'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerDetailPackageScheduleParams,
  CustomerDetailPackageScheduleResponse,
  CustomerDetailPackageScheduleResponseSchema,
} from '@apps/packages/services/customer-umroh-package-detail/customer-umroh-package-detail-schedule'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerDetailPackageScheduleConfig = {
  queryKey?: QueryKey
  params: CustomerDetailPackageScheduleParams
  options?: UseQueryOptions<CustomerDetailPackageScheduleResponse>
}

export const useCustomerPackageDetailSchedule = (opt: useCustomerDetailPackageScheduleConfig) => {
  const {
    queryKey = [queryKeyCustomerPackageDetail.CUSTOMER_UMROH_PACKAGE_DETAIL_SCHEDULE],
    params,
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerDetailPackageScheduleResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerDetailPackageSchedule.getDetailSchedule({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerDetailPackageScheduleResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
