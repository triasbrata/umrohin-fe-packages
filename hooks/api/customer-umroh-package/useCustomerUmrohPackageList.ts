import { queryKeyCustomerUmrohPackage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  CustomerUmrohPackageResponse,
  CustomerUmrohPackageParams,
  CustomerUmrohPackageResponseSchema,
} from '@apps/packages/services/customer-umroh-package'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerUmrohPackageConfig = {
  queryKey?: QueryKey
  params?: CustomerUmrohPackageParams
  options?: UseQueryOptions<CustomerUmrohPackageResponse>
}

export const placeholderData: CustomerUmrohPackageResponse = {
  meta: {
    code: 200,
    message: '',
    response_time: 0,
    success: true,
  },
  result: [],
}

export const useCustomerUmrohPackage = (opt?: useCustomerUmrohPackageConfig) => {
  const { queryKey = [queryKeyCustomerUmrohPackage.CUSTOMER_UMROH_PACKAGE_LIST], params = {}, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerUmrohPackageResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerUmrohPackage.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerUmrohPackageResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
