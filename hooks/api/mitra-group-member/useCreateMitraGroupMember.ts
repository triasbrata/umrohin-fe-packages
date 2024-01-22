import { queryKeyMitraGroupMember } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MitraGroupMemberCreateItemBody,
  MitraGroupMemberCreateItemResponse,
} from '@apps/packages/services/mitra-group-member'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MitraGroupMemberCreateItemResponse, MitraGroupMemberCreateItemBody>
}

export const useCreateMitraGroupMember = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.meta.message,
    invalidateQueryKey: [queryKeyMitraGroupMember.MITRA_GROUP_MEMBER_LIST],
    mutationFn: (body: MitraGroupMemberCreateItemBody) => apiServices.mitraGroupMember.createItem({ body }),
    mutationOptions,
  })
}
