import * as auth from './auth'
import * as customer from './customer'
import * as customerOrder from './customer-order'
import * as dashboard from './dashboard'
import * as homepage from './homepage'
import * as internalUser from './internal-user'
import * as masterBank from './master-bank'
import * as masterFacility from './master-facility'
import * as masterFigure from './master-figure'
import * as masterLanguage from './master-language'
import * as masterPackage from './master-package'
import * as masterPartner from './master-partner'
import * as masterSkill from './master-skill'
import * as masterThematic from './master-thematics'
import * as masterTourLeader from './master-tour-leader'
import * as masterTourLocation from './master-tour-location'

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
}

export default apiServices
