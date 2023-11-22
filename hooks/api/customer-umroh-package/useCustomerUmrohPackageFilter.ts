import { queryKeyCustomerUmrohPackage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { HttpGetDetailResponse } from '@apps/packages/services/BaseResponse'
import {
  CustomerUmrohPackageFilterResponse,
  CustomerUmrohPackageFilterResponseSchema,
} from '@apps/packages/services/customer-umroh-package'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

type useCustomerUmrohPackageFilterConfig = {
  queryKey?: QueryKey
  params?: object
  options?: UseQueryOptions<CustomerUmrohPackageFilterResponse>
}

export const placeholderFilter: CustomerUmrohPackageFilterResponse = {
  meta: {
    code: 200,
    message: '',
    response_time: 0,
    success: true,
  },
  result: {
    plus_packages: [
      {
        id: 0,
        title: '',
        image: '',
        total: 0,
      },
    ],
    thematic: [
      {
        id: 0,
        title: '',
        total: 0,
      },
    ],
    agencies: [
      {
        id: 0,
        title: '',
        image: '',
      },
    ],
    airlines: [
      {
        id: 0,
        title: {
          name: '',
          iataCode: '',
        },
      },
    ],
    airports: [
      {
        id: 0,
        title: '',
      },
    ],
    facilities: [
      {
        id: 0,
        title: '',
      },
    ],
    tour_leaders: [
      {
        id: 0,
        title: '',
        image: '',
        total: 0,
      },
    ],
  },
}

export const useCustomerUmrohPackageFilter = (opt?: useCustomerUmrohPackageFilterConfig) => {
  const { queryKey = [queryKeyCustomerUmrohPackage.CUSTOMER_UMROH_PACKAGE_FILTER], params = {}, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerUmrohPackageFilterResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderFilter,
    []
  )

  return useQuery({
    queryKey,
    queryFn: () => apiServices.customerUmrohPackage.getFilter({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CustomerUmrohPackageFilterResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
