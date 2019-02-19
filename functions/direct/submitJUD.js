const functions = require('firebase-functions')

const { isEmpty, omit } = require('lodash')
const { getTalk } = require('../firestore/talk')
const { addProposal } = require('../firestore/proposal')

// To use this migration function, launch firebase shell:
// firebase functions:shell
// and simply type submitJUD with the talk id to move.
// firebase > submitJud('yzvHgSgSV2ArYi5NBpzx')
const submitJUD = async (talkId) => {
  const JUDCon = 'wpYPL2EC3WzxUqY77rQZ'
  const RivieraDEV= 'MdKOzN5iWpoAWLEaTX8M'
  const talk = await getTalk(talkId)
  const submittedTalk = omit(talk, ['createTimestamp', 'submissions'])
  if (isEmpty(submittedTalk)) {
    console.log('Talk not found')
    return
  }
  console.log(`Talk: ${JSON.stringify(submittedTalk)} to be submitted to JUDCon`)

  await addProposal(JUDCon, submittedTalk)
  console.log(`Talk: ${submittedTalk.title} submitted to JUDCon`)

  // remove from rivieraDEV
  // const updatedTalk = flow(
  //   unset(`submissions.${eventId}`),
  //   unset('state'),
  // )(talk)
  //
  // await updateTalk(updatedTalk.id, updatedTalk)
  // await removeProposal(eventId, talk.id)
}
module.exports = {
  submitJud: functions.https.onCall(submitJUD),
}
