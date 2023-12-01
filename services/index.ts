import * as auth from './auth'
import * as customerTransaction from './customer-transactions'
import * as customerTransactionsHistory from './customer-transactions-history'
import * as customerUmrohPackage from './customer-umroh-package'
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
import * as homepage from './homepage'
import * as internalUser from './internal-user'
import * as masterAgency from './master-agency'
import * as masterAirlines from './master-airlines'
import * as masterAirport from './master-airport'
import * as masterCity from './master-city'
import * as masterFacility from './master-facility'
import * as masterHotel from './master-hotel'
import * as masterThematic from './master-thematics'
import * as masterTourLeader from './master-tour-leader'
import * as masterTourLocation from './master-tour-location'

const apiServices = {
  auth,
  customerTransaction,
  customerTransactionsHistory,
  customerUmrohPackage,
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
  masterHotel,
}

export default apiServices
