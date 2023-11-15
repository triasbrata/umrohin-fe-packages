import { queryKeyMasterCity } from '@apps/split/lib/constants'
import { DummyMasterCityListItem } from '@apps/split/services/master-city'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useDummyMasterCityDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<DummyMasterCityListItem>
}

export const useDummyMasterCityDetail = (opt?: useDummyMasterCityDetailConfig) => {
  const { queryKey = [queryKeyMasterCity.DUMMY_MASTER_CITY_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: DummyMasterCityListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    name: '',
    country: '',
    province: '',
    icon_url: '',
    status: 0,
  }

  return useQuery<DummyMasterCityListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
