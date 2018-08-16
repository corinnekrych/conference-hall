import React from 'react'
import PropTypes from 'prop-types'
import { UnlimitedList } from 'react-unlimited'

import { withSizes } from 'styles/utils'
import { ListItem } from 'components/list'
import ProposalSubtitle from './proposalSubtitle'
import ProposalInfo from './proposalInfo'
import './proposalsList.css'

const Proposals = ({
  eventId,
  proposals,
  onSelect,
  isMobile,
  scrollerRef,
}) => (
  <UnlimitedList
    className="list event-proposals"
    length={proposals.length}
    rowHeight={75}
    overscan={10}
    scrollerRef={scrollerRef}
    renderRow={({ index, style }) => (
      <ListItem
        key={proposals[index].id}
        title={proposals[index].title}
        style={style}
        subtitle={!isMobile && <ProposalSubtitle eventId={eventId} proposal={proposals[index]} />}
        info={<ProposalInfo proposal={proposals[index]} isMobile={isMobile} />}
        onSelect={() => onSelect(eventId, proposals[index].id)}
      />
    )}
  />
)

Proposals.propTypes = {
  eventId: PropTypes.string.isRequired,
  proposals: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  scrollerRef: PropTypes.any,
}

Proposals.defaultProps = {
  proposals: [],
  scrollerRef: undefined,
}

export default withSizes(Proposals)
