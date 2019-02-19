const initialize = require('./firestore/init')

initialize()

// functions for triggered events calls
exports.onCreateProposal = require('./triggers/onCreateProposal')
exports.onUpdateProposal = require('./triggers/onUpdateProposal')
exports.onUpdateTalk = require('./triggers/onUpdateTalk')

// functions for HTTP APIs
exports.api = require('./api')

// functions for direct calls
const { submitTalk, unsubmitTalk } = require('./direct/submission')
const { submitJud } = require('./direct/submitJUD')

exports.submitTalk = submitTalk
exports.unsubmitTalk = unsubmitTalk
exports.submitJud = submitJud
