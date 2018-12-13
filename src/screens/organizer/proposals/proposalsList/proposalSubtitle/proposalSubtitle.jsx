import React from 'react'
import PropTypes from 'prop-types'

import Inline from 'components/inline'

import './proposalSubtitle.css'

const ProposalSubtitle = ({ formatLabel, categoryLabel, speakerName }) => (
  <Inline className="proposal-subtitle" classNameItem="proposal-subtitle-item">
    {!!formatLabel && formatLabel}
    {!!categoryLabel && categoryLabel}
    {!!speakerName && speakerName}
  </Inline>
)

ProposalSubtitle.propTypes = {
  formatLabel: PropTypes.string,
  categoryLabel: PropTypes.string,
  speakerName: PropTypes.string,
}

ProposalSubtitle.defaultProps = {
  formatLabel: undefined,
  categoryLabel: undefined,
  speakerName: undefined,
}

export default ProposalSubtitle
q
