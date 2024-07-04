import { queryKeyMasterFigure } from '@apps/packages/lib/constants'
import { MasterFigureListItem } from '@apps/packages/services/master-figure'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterFigureDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterFigureListItem>
}

export const useMasterFigureDetail = (opt?: useMasterFigureDetailConfig) => {
  const { queryKey = [queryKeyMasterFigure.MASTER_FIGURE_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterFigureListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    name: '',
    short_description: '',
    description: '',
    year_experience: 0,
    price: 0,
    discount: 0,
    status: '',
    featured_image: '',
    image: '',
    skills: [],
    languages: [],
    type: '',
  }

  return useQuery<MasterFigureListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
