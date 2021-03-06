import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import InviteOrganizer from './inviteOrganizer'

const mapStore = (store, ownProps, { router }) => {
  const organizationId = router.getRouteParam('organizationId')
  const uidInvite = router.getRouteParam('uid')
  const { uid } = store.auth.get()
  const { displayName, photoURL } = store.data.users.get(uidInvite) || {}
  const { name } = store.data.organizations.get(organizationId) || {}

  return {
    loaded: store.data.organizations.hasKey(organizationId) && store.data.users.hasKey(uidInvite),
    name,
    displayName,
    photoURL,
    uidInvite,
    load: () => {
      store.dispatch({ type: '@@ui/ON_LOAD_ORGANIZATION', payload: organizationId })
      store.dispatch({ type: '@@ui/FETCH_USER', payload: uidInvite })
      store.dispatch({ type: '@@ui/FETCH_USER', payload: uid })
    },
    join: () => {
      store.dispatch({ type: '@@ui/ADD_ORGANIZATION_MEMBER', payload: { uid, organizationId } })
    },
    cancel: () => router.push('/organizer'),
  }
}

export default compose(
  forRoute.absolute('INVITE_ORGANIZER'), //
  inject(mapStore), //
  loader, //
)(InviteOrganizer)
