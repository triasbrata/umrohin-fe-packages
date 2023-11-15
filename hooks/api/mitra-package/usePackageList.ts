import { queryKeyMitraPackage } from '@apps/split/lib/constants'
import { PackageListItem } from '@apps/split/services/mitra-package'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type usePackageListConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<PackageListItem[]>
}

export const usePackageList = (opt?: usePackageListConfig) => {
  const { queryKey = [queryKeyMitraPackage.MITRA_PACKAGE_LIST], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: PackageListItem[] = queryClient.getQueryData(queryKey) ?? []

  return useQuery<PackageListItem[]>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
