import { queryKeyCustomerAgency } from '@apps/packages/lib/constants'
import { queryKeyCustomerPackageDetail } from '@apps/packages/lib/constants/queryKeyCustomerDetailPackage'
import apiServices from '@apps/packages/services'
import { placeholderDetailBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerAgencyHeaderParams,
  CustomerAgencyHeaderResponse,
  CustomerAgencyHeaderResponseSchema,
} from '@apps/packages/services/customer-agency'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerAgencyHeaderConfig = {
  queryKey?: QueryKey
  params: CustomerAgencyHeaderParams
  options?: UseQueryOptions<CustomerAgencyHeaderResponse>
}

export const useCustomerAgencyHeader = (opt: useCustomerAgencyHeaderConfig) => {
  const { queryKey = [queryKeyCustomerAgency.CUSTOMER_AGENCY_HEADER], params, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerAgencyHeaderResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderDetailBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerAgency.getAgencyHeader({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerAgencyHeaderResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
