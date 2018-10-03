const getObjectID = require('../../helper.js')

const survey = [
  {
    _id: getObjectID('survey1'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    creator: getObjectID('user1'),
    title: 'Untersuchung zu sozialpsychologische Phänomene im Projektmanagement',
    description: 'Eine wissenschaftliche Umfrage mit der Forschungsfrage: "Welche Effekte können in einer Teamarbeit auftreten"',
    isPublic: true,
    types: [
      'CHOICE',
      'LIKE',
      'LIKEDISLIKE',
      'REGULATOR',
      'FAVORITE',
      'RANKING',
    ],
    questions: [
      getObjectID('question1'),
      getObjectID('question4'),
      getObjectID('question5'),
      getObjectID('question10'),
      getObjectID('question11'),
      getObjectID('question12'),
    ],
    votes: [
      getObjectID('vote1'),
    ],
  },
  {
    _id: getObjectID('survey2'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    creator: getObjectID('user2'),
    title: 'Öffentliche Umfrage im Rahmen des Modules "Computerethik"',
    description: 'Eine wissenschaftliche Umfrage mit der Forschungsfrage: "Künstliche Intelligenz?',
    isPublic: true,
    types: [
      'FAVORITE',
      'LIKE',
      'LIKEDISLIKE',
      'RANKING',
    ],
    questions: [
      getObjectID('question2'),
      getObjectID('question3'),
      getObjectID('question6'),
      getObjectID('question7'),
      getObjectID('question8'),
      getObjectID('question9'),
    ],
    votes: null,
  },
]

module.exports = survey
