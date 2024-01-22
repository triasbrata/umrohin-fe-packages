import { queryKeyMitraGroupMember } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MitraGroupMemberDeleteItemParams,
  MitraGroupMemberDeleteItemResponse,
} from '@apps/packages/services/mitra-group-member'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MitraGroupMemberDeleteItemResponse, MitraGroupMemberDeleteItemParams>
}

export const useDeleteMitraGroupMember = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMitraGroupMember.MITRA_GROUP_MEMBER_LIST],
    mutationFn: (params: MitraGroupMemberDeleteItemParams) => apiServices.mitraGroupMember.deleteItem({ params }),
    mutationOptions,
  })
}
