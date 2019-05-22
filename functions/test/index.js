const firebase = require('firebase-admin')

// Firebase configuration
const REACT_APP_API_KEY = 'AIzaSyAnzNi0GrIsyxhTAhJJmbWpBYNP42w5kWM'
const REACT_APP_AUTH_DOMAIN = 'rivieradev-db8f5.firebaseapp.com'
const REACT_APP_PROJECT_ID = 'rivieradev-db8f5'

const config = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
}
firebase.initializeApp(config)

const addProposal = (eventId, proposal) => {
  const now = firebase.firestore.FieldValue.serverTimestamp()
  return firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .add({
      ...proposal,
      rating: null,
      state: 'submitted',
      updateTimestamp: now,
      createTimestamp: now,
    })
}

const getTalks = async (talkName) => {
  const query = firebase
    .firestore()
    .collection('talks')
    .where('title', '>=', talkName)
  const result = await query.get()
  return result.docs.map(ref => ({ id: ref.id, ...ref.data() }))
}

const removeTalk = talkId => firebase
  .firestore()
  .collection('talks')
  .doc(talkId)
  .delete()

const removeAllTalks = async (talkName) => {
  const talks = await getTalks(talkName)
  for (let i = 0; i < talks.length; i += 1) {
    console.log(`remove ${talks[i].id}`)
    removeTalk(talks[i].id)
  }
}
// todo remove all submissions in event's proposals collection
const removeProposal = (eventId, proposalId) => firebase
  .firestore()
  .collection('events')
  .doc(eventId)
  .collection('proposals')
  .doc(proposalId)
  .delete()

const createTalks = (data) => {
  for (let i = 0; i < data.length; i += 1) {
    firebase
      .firestore()
      .collection('talks')
      .add({
        ...data[i],
      })
  }
  const talks = getTalks(data[0].title)
  return talks
}

const addSubmissions = async (eventId, talks) => {
  const submissions = []
  for (let i = 0; i < talks.length; i += 1) {
    addProposal(eventId, talks[i])
  }
  return submissions
}

const createTestSubmission = async (ownerId, eventId, numberOfTalks) => {
  const talks = []
  for (let i = 0; i < numberOfTalks; i += 1) {
    const talk = {
      abstract: 'some abstract',
      level: 'beginner',
      title: `title-test-${i}`,
      owner: ownerId,
      speakers: { [ownerId]: true },
    }
    talks.push(talk)
  }
  const talkDB = await createTalks(talks)
  console.log(`:::: ${JSON.stringify(talkDB)}`)
  await addSubmissions(eventId, talks)
}

// eventId TL1xm0zyxZG8eoXBE5mp is a TEST conf
const testEventId = 'TL1xm0zyxZG8eoXBE5mp'
const talkName = 'title-test'
createTestSubmission('ibBeWNBzL3XVc0teerodftWdYzD2', testEventId, 200)

// clean-up
//removeAllTalks(talkName)
// todo remove all submissions in event's proposals collection
