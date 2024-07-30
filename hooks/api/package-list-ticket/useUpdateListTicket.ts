import { queryKeyPackageListTicket } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  PackageListTicketUpdateItemBody,
  PackageListTicketUpdateItemParams,
  PackageListTicketUpdateItemResponse,
} from '@apps/packages/services/package-list-ticket'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageListTicketUpdateItemResponse, PackageListTicketUpdateItemBody>
}

type ParamsType = PackageListTicketUpdateItemParams & PackageListTicketUpdateItemBody

export const useUpdateListTicket = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyPackageListTicket.PACKAGE_LIST_TICKET_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.packageListTicket.updateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
