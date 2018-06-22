const getObjectID = require('../../helper.js')

const context = [
  {
    _id: getObjectID('context1'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    activeQuestion: getObjectID('question4'),
    activeSurvey: getObjectID('survey1'),
    owners: [getObjectID('user1')],
    devices: [],
    name: 'Forum Gummersbach',
    states: [],
  },
]

module.exports = context
