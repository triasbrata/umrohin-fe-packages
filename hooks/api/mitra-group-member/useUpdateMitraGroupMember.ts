import { queryKeyMitraGroupMember } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MitraGroupMemberUpdateItemBody,
  MitraGroupMemberUpdateItemParams,
  MitraGroupMemberUpdateItemResponse,
} from '@apps/packages/services/mitra-group-member'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MitraGroupMemberUpdateItemResponse, MitraGroupMemberUpdateItemBody>
}

type ParamsType = MitraGroupMemberUpdateItemParams & MitraGroupMemberUpdateItemBody

export const useUpdateMitraGroupMember = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: (res) => res.meta.message,
    invalidateQueryKey: [queryKeyMitraGroupMember.MITRA_GROUP_MEMBER_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.mitraGroupMember.updateItem({ params, body })
    },
    mutationOptions,
  })
}
