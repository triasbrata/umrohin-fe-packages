import * as auth from './auth'
import * as customer from './customer'
import * as customerOrder from './customer-order'
import * as dashboard from './dashboard'
import * as homepage from './homepage'
import * as internalUser from './internal-user'
import * as masterAirlines from './master-airlines'
import * as masterAirport from './master-airport'
import * as masterBank from './master-bank'
import * as masterCityFlight from './master-city-flight'
import * as masterFacility from './master-facility'
import * as masterFigure from './master-figure'
import * as masterFlightRoute from './master-flight-route'
import * as masterHotelInternal from './master-hotel-internal'
import * as masterLanguage from './master-language'
import * as masterPackage from './master-package'
import * as masterPartner from './master-partner'
import * as masterProvider from './master-provider'
import * as masterSkill from './master-skill'
import * as masterThematic from './master-thematics'
import * as masterTourLeader from './master-tour-leader'
import * as masterTourLocation from './master-tour-location'
import * as packageFlightTicket from './package-flight-ticket'
import * as packageHotelVendor from './package-hotel-vendor'
import * as packageListTicket from './package-list-ticket'

const apiServices = {
  auth,
  customer,
  dashboard,
  homepage,
  internalUser,
  masterFacility,
  masterThematic,
  masterTourLocation,
  masterTourLeader,
  masterBank,
  masterLanguage,
  masterSkill,
  masterFigure,
  masterPackage,
  customerOrder,
  masterPartner,
  masterAirlines,
  masterAirport,
  masterCityFlight,
  masterHotelInternal,
  masterProvider,
  masterFlightRoute,
  packageFlightTicket,
  packageListTicket,
  packageHotelVendor,
}

export default apiServices
