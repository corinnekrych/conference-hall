import firebase from 'firebase/app'
import omit from 'lodash/omit'

/**
 * Return the proposal with the given id
 * @param {string} eventId event id
 * @param {string} proposalId proposal id
 */
export const fetchProposal = (eventId, proposalId) => firebase
  .firestore()
  .collection('events')
  .doc(eventId)
  .collection('proposals')
  .doc(proposalId)
  .get()

/**
 * Fetch all proposals of an event
 * @param {string} eventId event id
 * @param {object} options options with filters and sortOrder
 */
export const fetchEventProposals = async (
  eventId,
  uid,
  {
    categories, formats, state, sortOrder, ratings,
  } = {},
) => {
  let query = firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')

  // add filters
  if (categories) {
    query = query.where('categories', '==', categories)
  }
  if (formats) {
    query = query.where('formats', '==', formats)
  }
  if (state) {
    query = query.where('state', '==', state)
  }
  // add sortOrder
  if (sortOrder) {
    if (sortOrder === 'newest') {
      query = query.orderBy('updateTimestamp', 'desc')
    } else if (sortOrder === 'oldest') {
      query = query.orderBy('updateTimestamp', 'asc')
    } else if (sortOrder === 'highestRating') {
      query = query.orderBy('rating', 'desc')
    } else if (sortOrder === 'lowestRating') {
      query = query.orderBy('rating', 'asc')
    }
  }

  const result = await query.get()
  const proposals = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))

  // add ratings filter (client filter)
  if (ratings === 'rated') {
    return proposals.filter(proposal => proposal.usersRatings && !!proposal.usersRatings[uid])
  }
  if (ratings === 'notRated') {
    return proposals.filter(proposal => !proposal.usersRatings || !proposal.usersRatings[uid])
  }
  return proposals
}

/**
 * Add a proposal to an event
 * @param {string} eventId event id
 * @param {object} submittedTalk submittedTalk data
 */
export const addProposal = (eventId, submittedTalk) => {
  const { submissions, ...copyTalk } = submittedTalk
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(submittedTalk.id)
    .set({
      ...copyTalk,
      rating: null,
      state: 'submitted',
      updateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

/**
 * Remove a proposal from an event
 * @param {string} eventId event id
 * @param {string} talkId talk id
 */
export const removeProposal = async (eventId, talkId) => {
  await firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(talkId)
    .delete()
}

export const updateProposal = (eventId, proposal, options = {}) => {
  const updated = omit(proposal, 'submissions')
  if (options.updateTimestamp) {
    updated.updateTimestamp = firebase.firestore.FieldValue.serverTimestamp()
  }
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(proposal.id)
    .update(updated)
}

export const updateRating = (eventId, talkId, uid, ratingUpdated, rated) => {
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(talkId)
    .update({ ...ratingUpdated, [`usersRatings.${uid}`]: rated })
}
