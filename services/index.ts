import * as auth from './auth'
import * as customerAgency from './customer-agency'
import * as customerTourLeader from './customer-tour-leader'
import * as customerTransaction from './customer-transactions'
import * as customerTransactionsHistory from './customer-transactions-history'
import * as customerUmrohPackage from './customer-umroh-package'
import * as customerPackageAgency from './customer-umroh-package/customer-umroh-package-agency'
import * as customerPackageAirline from './customer-umroh-package/customer-umroh-package-airline'
import * as customerPackageAirport from './customer-umroh-package/customer-umroh-package-airport'
import * as customerPackageDepartureMonth from './customer-umroh-package/customer-umroh-package-departure-month'
import * as customerPackageFacility from './customer-umroh-package/customer-umroh-package-facility'
import * as customerPackageThematics from './customer-umroh-package/customer-umroh-package-thematics'
import * as customerPackageTourDestinations from './customer-umroh-package/customer-umroh-package-tour-destinations'
import * as customerPackageTourLeaders from './customer-umroh-package/customer-umroh-package-tour-leaders'
import * as customerDetailPackage from './customer-umroh-package-detail'
import * as customerDetailPackageAccomodation from './customer-umroh-package-detail/customer-umroh-package-detail-accomodation'
import * as customerDetailPackageAirlines from './customer-umroh-package-detail/customer-umroh-package-detail-airlines'
import * as customerDetailPackageFacility from './customer-umroh-package-detail/customer-umroh-package-detail-facility'
import * as customerDetailPackageImage from './customer-umroh-package-detail/customer-umroh-package-detail-image'
import * as customerDetailPackagePrice from './customer-umroh-package-detail/customer-umroh-package-detail-price'
import * as customerDetailPackageSchedule from './customer-umroh-package-detail/customer-umroh-package-detail-schedule'
import * as customerDetailPackageTourDestination from './customer-umroh-package-detail/customer-umroh-package-detail-tour-destination'
import * as customerDetailPackageTourLeader from './customer-umroh-package-detail/customer-umroh-package-detail-tour-leader'
import * as customer from './customers'
import * as dashboard from './dashboard'
import * as homepage from './homepage'
import * as internalUser from './internal-user'
import * as masterAirlines from './master-airlines'
import * as masterAirport from './master-airport'
import * as masterBank from './master-bank'
import * as masterCity from './master-city'
import * as masterFacility from './master-facility'
import * as masterHotel from './master-hotel'
import * as masterThematic from './master-thematics'
import * as masterTourLeader from './master-tour-leader'
import * as masterTourLocation from './master-tour-location'
import * as mitraAgency from './mitra-agency'
import * as mitraGroup from './mitra-group'
import * as mitraGroupMember from './mitra-group-member'
import * as mitraPackage from './mitra-package'

const apiServices = {
  auth,
  customerAgency,
  customerTourLeader,
  customerTransaction,
  customerTransactionsHistory,
  customerUmrohPackage,
  customerPackageAgency,
  customerPackageAirline,
  customerPackageAirport,
  customerPackageDepartureMonth,
  customerPackageFacility,
  customerPackageThematics,
  customerPackageTourDestinations,
  customerPackageTourLeaders,
  customerDetailPackage,
  customerDetailPackageFacility,
  customerDetailPackageAirlines,
  customerDetailPackagePrice,
  customerDetailPackageSchedule,
  customerDetailPackageAccomodation,
  customerDetailPackageTourDestination,
  customerDetailPackageTourLeader,
  customerDetailPackageImage,
  customer,
  dashboard,
  homepage,
  internalUser,
  masterAirlines,
  masterAirport,
  masterBank,
  masterCity,
  masterFacility,
  masterThematic,
  masterTourLocation,
  masterTourLeader,
  masterHotel,
  mitraAgency,
  mitraPackage,
  mitraGroup,
  mitraGroupMember,
}

export default apiServices
