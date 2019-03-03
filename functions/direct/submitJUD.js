const functions = require('firebase-functions')

const { isEmpty, omit } = require('lodash')
const { getAllTalks } = require('../firestore/talk')
const { addProposal } = require('../firestore/proposal')

// To use this migration function, launch firebase shell:
// firebase functions:shell
// and simply type submitJUD with the talk id to move.
// firebase > submitJud()
const submitJUD = async () => {
  // const JUDCon = 'wpYPL2EC3WzxUqY77rQZ'
  const test = 'TL1xm0zyxZG8eoXBE5mp'
  const corinne = 'ibBeWNBzL3XVc0teerodftWdYzD2'
  const talks = await getAllTalks()
  const corinneTalks = talks.filter(t => t.speakers[corinne])
  console.log(`${JSON.stringify(corinneTalks)}`)
  for (const talk of corinneTalks) {
    const submittedTalk = omit(talk, ['createTimestamp', 'submissions'])
    if (isEmpty(submittedTalk)) {
      console.log('Talk not found')
      return
    }
    console.log(`Talk: ${JSON.stringify(submittedTalk)} to be submitted to Test`)
    //await addProposal(test, submittedTalk)
    console.log(`Talk: ${submittedTalk.title} submitted to Test`)
  }
}
module.exports = {
  submitJud: functions.https.onCall(submitJUD),
}
