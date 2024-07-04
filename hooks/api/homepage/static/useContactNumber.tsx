import { queryKeyHomepage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderDetailBuilder } from '@apps/packages/services/BaseResponse'
import { HomepageStaticContactResponse, HomepageStaticContactResponseSchema } from '@apps/packages/services/homepage'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

type useHomepageStaticContactNumberConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<HomepageStaticContactResponse>
}

export const useContactNumber = (opt?: useHomepageStaticContactNumberConfig) => {
  const { queryKey = [queryKeyHomepage.CONTACT_NUMBER], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: HomepageStaticContactResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderDetailBuilder(),
    []
  )

  return useQuery<HomepageStaticContactResponse>({
    queryKey,
    queryFn: () => apiServices.homepage.getContact(),
    placeholderData,
    refetchOnWindowFocus: false,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: HomepageStaticContactResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
