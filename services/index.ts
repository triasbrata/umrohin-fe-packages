import * as auth from './auth'
import * as customerTransaction from './customer-transactions'
import * as customer from './customers'
import * as internalUser from './internal-user'
import * as masterAirport from './master-airport'
import * as masterCity from './master-city'
import * as masterFacility from './master-facility'
import * as masterThematic from './master-thematics'
import * as masterTourLocation from './master-tour-location'

const apiServices = {
  auth,
  customerTransaction,
  customer,
  internalUser,
  masterAirport,
  masterCity,
  masterFacility,
  masterThematic,
  masterTourLocation,
}

export default apiServices
