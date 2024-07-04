import { queryKeyMasterPackage } from '@apps/packages/lib/constants'
import { MasterPackageListItem } from '@apps/packages/services/master-package'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterPackageDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterPackageListItem>
}

export const useMasterPackageDetail = (opt?: useMasterPackageDetailConfig) => {
  const { queryKey = [queryKeyMasterPackage.MASTER_PACKAGE_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterPackageListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    user_id: '',
    name: '',
    package_name: '',
    title: '',
    description: '',
    status: '',
  }

  return useQuery<MasterPackageListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
