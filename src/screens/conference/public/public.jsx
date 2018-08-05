import React, { Fragment } from 'react'
import forRoute from 'hoc-little-router'

import AppLayout from 'layout'
import Contributors from 'screens/components/contributors'

import Event from './event'

const Public = () => (
  <AppLayout>
    {() => (
      <Fragment>
        <Event />
        <Contributors />
      </Fragment>
    )}
  </AppLayout>
)

export default forRoute('PUBLIC')(Public)
