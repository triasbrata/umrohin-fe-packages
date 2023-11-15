import { useAntdContextHolder } from '@apps/split/lib/context'
import { HttpGetDetailResponse, HttpGetListResponse } from '@apps/services/BaseResponse'
import {
  MutationFunction,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Cancel, CheckCircle } from 'iconoir-react'
import { useEffect } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import { useAuthRefreshToken } from './auth'

type MutateNotificationType<ResponseType, Params> = {
  (res: ResponseType, variables: Params): string
}

export type BaseMutationOptions<ResponseType, Params> = UseMutationOptions<ResponseType, unknown, Params, unknown>

export type useMutateItemConfig<ResponseType, Params> = {
  successMessage?: MutateNotificationType<ResponseType, Params>
  errorMessage?: MutateNotificationType<ResponseType, Params>
  invalidateQueryKey?: QueryKey
  mutationFn: MutationFunction<ResponseType, Params>
  mutationOptions?: BaseMutationOptions<ResponseType, Params>
}

export const useMutateItem = <ResponseType extends HttpGetDetailResponse, Params>(
  args: useMutateItemConfig<ResponseType, Params>
) => {
  const { invalidateQueryKey, successMessage, errorMessage, mutationFn, mutationOptions } = args
  const queryClient = useQueryClient()
  const { antdNotification } = useAntdContextHolder()
  const refreshToken = useAuthRefreshToken()

  const mutation = useMutation({
    mutationFn,
    onSuccess: (res, variables, context) => {
      if (res.meta.success) {
        antdNotification?.success({
          message: successMessage?.(res, variables) ?? 'Success',
          icon: <CheckCircle color="#10B981" height={24} width={24} />,
          closeIcon: <Cancel height={24} width={24} />,
          className: 'custom-antd-notification',
        })
        if (invalidateQueryKey) queryClient.invalidateQueries({ queryKey: invalidateQueryKey })
        mutationOptions?.onSuccess?.(res, variables, context)
        return
      }
      antdNotification?.error({
        message: errorMessage?.(res, variables) ?? 'Failed',
        icon: <AiOutlineCloseCircle color="#EE204D" fontSize="24" />,
        closeIcon: <Cancel height={24} width={24} />,
        className: 'custom-antd-notification',
      })
    },
    onError: (error) => {
      console.error(error)
      antdNotification?.error({
        message: 'Mutation Failed!',
        icon: <AiOutlineCloseCircle color="#EE204D" fontSize="24" />,
        closeIcon: <Cancel height={24} width={24} />,
        className: 'custom-antd-notification',
      })
    },
  })

  const { data: response } = mutation
  const { code } = response?.meta ?? {}

  useEffect(() => {
    if (code !== 401) return
    refreshToken().then(() => mutation.mutate(mutation.variables!))
  }, [code])

  return mutation
}

export const useQueryList = <T extends HttpGetListResponse>(options: UseQueryOptions<T>) => {
  const refreshToken = useAuthRefreshToken()
  const query = useQuery(options)
  const { data: response } = query
  const { code } = response?.meta ?? {}

  useEffect(() => {
    if (code !== 401) return
    refreshToken().then(() => query.refetch())
  }, [code])

  return query
}
