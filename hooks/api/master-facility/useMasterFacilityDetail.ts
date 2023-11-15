import { queryKeyMasterFacility } from '@apps/split/lib/constants'
import { MasterFacilityListItem } from '@apps/split/services/master-facility'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterFacilityDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterFacilityListItem>
}

export const useMasterFacilityDetail = (opt?: useMasterFacilityDetailConfig) => {
  const { queryKey = [queryKeyMasterFacility.MASTER_FACILITY_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterFacilityListItem = queryClient.getQueryData(queryKey) ?? {
    status: 0,
    name: '',
    desc: '',
    facility_id: '',
    icon: '',
  }

  return useQuery<MasterFacilityListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    ...options,
  })
}
