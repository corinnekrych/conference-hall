import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import { TalkAbstract, TalkSpeakers, TalkSubmissions } from 'screens/components/talk'

import './talkPage.css'

const TalkPage = ({
  id, title, abstract, level, references, speakers, submissions,
}) => (
  <div>
    <Titlebar icon="fa fa-microphone" title={title}>
      <Link href={`/speaker/talk/${id}/edit`} className="btn">
        <IconLabel icon="fa fa-pencil" label="Edit" />
      </Link>
    </Titlebar>
    <div className="talk-page">
      <TalkAbstract className="talk-content" abstract={abstract} references={references} />
      <div className="talk-info">
        <TalkSpeakers speakers={speakers} level={level} />
        <TalkSubmissions id={id} submissions={submissions} />
      </div>
    </div>
  </div>
)

TalkPage.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  abstract: PropTypes.string,
  level: PropTypes.string,
  references: PropTypes.string,
  speakers: PropTypes.objectOf(PropTypes.bool),
  submissions: PropTypes.objectOf(PropTypes.any),
}

TalkPage.defaultProps = {
  abstract: undefined,
  level: 'not defined',
  references: undefined,
  speakers: {},
  submissions: {},
}

export default TalkPage