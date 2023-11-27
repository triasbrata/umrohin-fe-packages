import * as auth from './auth'
import * as customerTransaction from './customer-transactions'
import * as customerTransactionsHistory from './customer-transactions-history'
import * as customerUmrohPackage from './customer-umroh-package'
import * as customer from './customers'
import * as homepage from './homepage'
import * as internalUser from './internal-user'
import * as masterAgency from './master-agency'
import * as masterAirlines from './master-airlines'
import * as masterAirport from './master-airport'
import * as masterCity from './master-city'
import * as masterFacility from './master-facility'
import * as masterThematic from './master-thematics'
import * as masterTourLeader from './master-tour-leader'
import * as masterTourLocation from './master-tour-location'

const apiServices = {
  auth,
  customerTransaction,
  customerTransactionsHistory,
  customerUmrohPackage,
  customer,
  homepage,
  internalUser,
  masterAgency,
  masterAirlines,
  masterAirport,
  masterCity,
  masterFacility,
  masterThematic,
  masterTourLocation,
  masterTourLeader,
}

export default apiServices
