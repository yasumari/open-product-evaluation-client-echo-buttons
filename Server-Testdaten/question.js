/**
 * Created by Dennis Dubbert on 27.06.18.
 */
const getObjectID = require('../../helper.js')

const question = [
  
  {
    user: getObjectID('user1'),
    survey: getObjectID('survey1'),
    _id: getObjectID('question11'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    type: 'FAVORITE',
    value: 'Arbeitest du lieber alleine oder zu zweit?',
    description: null,
    items: [
      {
        _id: getObjectID('item111A'),
        label: 'alleine',
        image: getObjectID('image111A'),
      },
      {
        _id: getObjectID('item111B'),
        label: 'zu zweit',
        image: getObjectID('image111B'),
      },
    ],
  },
  
  {
    user: getObjectID('user2'),
    survey: getObjectID('survey2'),
    _id: getObjectID('question2'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    type: 'FAVORITE',
    value: 'Bitte favorisieren Sie ein Element aus dieser Liste',
    description: null,
    items: [
      {
        _id: getObjectID('item2A'),
        label: 'Objekt 1',
        image: getObjectID('image6.2'),
      },
      {
        _id: getObjectID('item2B'),
        label: 'Objekt 2',
        image: getObjectID('image5.2'),
      },
      {
        _id: getObjectID('item12C'),
        label: 'Objekt 3',
        image: getObjectID('image12.1'),
      }
    ],
  },
  
]

module.exports = question