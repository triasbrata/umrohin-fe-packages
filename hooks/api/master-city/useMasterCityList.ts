import { queryKeyMasterCity } from '@apps/split/lib/constants'
import apiServices from '@apps/services'
import { placeholderListBuilder } from '@apps/services/BaseResponse'
import {
  DummyMasterCityListItem,
  MasterCityListParams,
  MasterCityListResponse,
  MasterCityListResponseSchema,
} from '@apps/split/services/master-city'
import { apiResponseValidation } from '@apps/split/utils'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useDummyMasterCityListConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<DummyMasterCityListItem[]>
}

export const useDummyMasterCityList = (opt?: useDummyMasterCityListConfig) => {
  const { queryKey = [queryKeyMasterCity.DUMMY_MASTER_CITY_LIST], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: DummyMasterCityListItem[] = queryClient.getQueryData(queryKey) ?? []

  return useQuery<DummyMasterCityListItem[]>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}

type useMasterCityListConfig = {
  queryKey?: QueryKey
  params?: MasterCityListParams
  options?: UseQueryOptions<MasterCityListResponse>
}

export const useMasterCityList = (opt?: useMasterCityListConfig) => {
  const { queryKey = [queryKeyMasterCity.MASTER_CITY_LIST], params = { page: 1, page_size: 10 }, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterCityListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterCity.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterCityListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
