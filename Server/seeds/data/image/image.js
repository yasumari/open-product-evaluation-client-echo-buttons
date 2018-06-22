const getObjectID = require('../../helper.js')

const images = [
  {
    _id: getObjectID('image1'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    name: 'likeicon',
    type: 'jpg',
    hash: '0258e9db051e7f2129ae5f6ba3cf3388c2fb39f5',
    tags: [],
  },
  {
    _id: getObjectID('image2'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    name: 'dislikeicon',
    type: 'jpg',
    hash: 'c8ce0922b686d0bcd5eff0f41ff12cd5dffbd779',
    tags: [],
  },
  {
    _id: getObjectID('image3'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    name: 'Auswahl A',
    type: 'png',
    hash: '4f43e19775fcb11264f47be83ab16a45c542dc84',
    tags: [],
  },
  {
    _id: getObjectID('image4'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    name: 'Auswahl B',
    type: 'png',
    hash: 'c30d42f225df1be08eddc3bc178b940f9f08305f',
    tags: [],
  },
  {
    _id: getObjectID('image5'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    name: 'Zusatz 1',
    type: 'png',
    hash: '8277394c7b5ff16d3f3cae6f0c0d3b4b2e7e6936',
    tags: [],
  },
  {
    _id: getObjectID('image6'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    name: 'Zusatz 2',
    type: 'png',
    hash: '4b720822aa2c369714b652f7868a1a04b13543b5',
    tags: [],
  },
]

module.exports = images
