import { queryKeyPackageListTicket } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  PackageListTicketDeleteItemParams,
  PackageListTicketDeleteItemResponse,
} from '@apps/packages/services/package-list-ticket'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageListTicketDeleteItemResponse, PackageListTicketDeleteItemParams>
}

export const useDeleteListTicket = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyPackageListTicket.PACKAGE_LIST_TICKET_LIST],
    mutationFn: (params: PackageListTicketDeleteItemParams) => apiServices.packageListTicket.deleteItem({ params }),
    mutationOptions,
  })
}
