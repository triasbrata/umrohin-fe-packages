import { queryKeyPackageListTicket } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  PackageListTicketCreateItemBody,
  PackageListTicketCreateItemResponse,
} from '@apps/packages/services/package-list-ticket'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageListTicketCreateItemResponse, PackageListTicketCreateItemBody>
}

export const useCreateListTicket = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyPackageListTicket.PACKAGE_LIST_TICKET_LIST],
    mutationFn: (body: PackageListTicketCreateItemBody) => apiServices.packageListTicket.createItem({ body }),
    mutationOptions,
  })
}
