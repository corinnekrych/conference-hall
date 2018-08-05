import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Brand from './brand'
import Navbar from './navbar'

import './layout.css'

class AppLayout extends Component {
  state = { ref: undefined }

  setRef = ref => this.setState({ ref })

  render() {
    const { children, sidebar } = this.props
    return (
      <div className={cn('layout-screen', { 'layout-screen-full-width': !sidebar })}>
        <Brand className="layout-brand" hasSidebar={!!sidebar} />
        <Navbar className="layout-navbar" />
        {sidebar && <div className="layout-sidebar">{sidebar}</div>}
        <div
          ref={this.setRef}
          className={cn('layout-main', { 'layout-main-full-width': !sidebar })}
        >
          {children(this.state.ref)}
        </div>
      </div>
    )
  }
}

AppLayout.propTypes = {
  children: PropTypes.PropTypes.func.isRequired,
  sidebar: PropTypes.node,
}

AppLayout.defaultProps = {
  sidebar: null,
}

export default AppLayout
