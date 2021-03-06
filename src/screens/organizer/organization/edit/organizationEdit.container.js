import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'

import OrganizationForm from '../components/organizationForm'

const FORM_NAME = 'organization-edit'

const mapStore = (store, ownProps, { router }) => {
  const organizationId = router.getRouteParam('organizationId')
  const organization = store.data.organizations.get(organizationId)
  return {
    loaded: !!organization,
    form: FORM_NAME,
    initialValues: organization,
    onSubmit: () => store.dispatch('@@ui/ON_UPDATE_ORGANIZATION'),
    load: () => store.dispatch('@@ui/ON_LOAD_ORGANIZATION'),
  }
}

export default compose(
  forRoute.absolute('EDIT_ORGANIZATION'), //
  inject(mapStore), //
  loader,
)(OrganizationForm)
