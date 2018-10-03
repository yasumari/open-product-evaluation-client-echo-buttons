/**
 * Created by Dennis Dubbert on 27.06.18.
 */
const getObjectID = require('../../helper.js')

const question = [
  {
    user: getObjectID('user1'),
    survey: getObjectID('survey1'),
    _id: getObjectID('question1'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    type: 'CHOICE',
    items: [
      {
        _id: getObjectID('item11A'),
        label: 'Toll, ein anderer machts!',
        image: getObjectID('image6'),
      },
      {
        _id: getObjectID('item11B'),
        label: 'Die Arbeit bleibt gleich.',
        image: getObjectID('image5'),
      },
      {
        _id: getObjectID('item11C'),
        label: 'Alle helfen und halten zusammen.',
        image: getObjectID('image50'),
      },
    ],
    value: 'Was erhoffst du dir durch Teamarbeit?',
    description: '',
    choices: [
      {
        _id: getObjectID('choice1A'),
        label: 'Ich tue nichts!',
        image: getObjectID('image4'),
        code: 'A',
      },
      {
        _id: getObjectID('choice1B'),
        label: 'Keine Veränderung',
        image: getObjectID('image4'),
        code: 'B',
      },
      {
        _id: getObjectID('choice1B'),
        label: 'Gute Zusammenarbeit',
        image: getObjectID('image3'),
        code: 'C',
      },
    ],
  },
  {
    user: getObjectID('user1'),
    survey: getObjectID('survey1'),
    _id: getObjectID('question4'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    type: 'LIKE',
    items: [
      {
        _id: getObjectID('item44A'),
        label: 'Durchsetzungsvermögen',
        image: getObjectID('image44A'),
      },
      {
        _id: getObjectID('item44B'),
        label: 'Organisation',
        image: getObjectID('image44B'),
      },
    ],
    value: 'Würdest du die Teamleitung übernehmen?',
    description: 'Bitte zeige mit einem "Like", ob du dafür bereit wärst.',
    likeIcon: getObjectID('image1'),
  },
  {
    user: getObjectID('user1'),
    survey: getObjectID('survey1'),
    _id: getObjectID('question5'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    type: 'LIKEDISLIKE',
    items: [
      {
        _id: getObjectID('item55A'),
        label: null,
        image: getObjectID('image55A'),
      },
      {
        _id: getObjectID('item55B'),
        label: null,
        image: getObjectID('image55B'),
      },
      {
        _id: getObjectID('item55C'),
        label: null,
        image: getObjectID('image55C'),
      }
    ],
    value: 'Magst du Präsentationen zu halten?',
    description: 'Bitte zeige mit einem "Like", ob du gerne im Vordergrund stehen.',
    likeIcon: getObjectID('image1.1'),
  },
  {
    user: getObjectID('user1'),
    survey: getObjectID('survey1'),
    _id: getObjectID('question10'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    type: 'REGULATOR',
    items: [
      {
        _id: getObjectID('item100A'),
        label: 'Ich habe Angst etwas falsch zu machen.',
        image: getObjectID('image100A'),
      },
      {
        _id: getObjectID('item100B'),
        label: 'Ich habe keine Angst, ich bin Superman',
        image: getObjectID('image100B'),
      },
    ],
    value: 'Sind Sie risikofreudig?',
    description: null,
    labels: [
      {
        _id: getObjectID('label10A'),
        label: 'Kein Risiko',
        image: null,
        value: 0.0,
      },
      {
        _id: getObjectID('label10B'),
        label: 'Hohes Risiko',
        image: null,
        value: 10.0,
      },
    ],
    stepSize: 10.0,
    min: 0.0,
    max: 100.0,
    default: 5.0,
  },
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
    user: getObjectID('user1'),
    survey: getObjectID('survey1'),
    _id: getObjectID('question12'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    type: 'RANKING',
    value: 'Welche Rolle würdest du gerne im Team einnehmen.',
    description: 'Sortiere die folgenden Rollen von der beliebesten bis zur unangenehmsten Rolle.',
    items: [
      {
        _id: getObjectID('item122A'),
        label: 'Erfinder',
        image: getObjectID('image122A'),
      },
      {
        _id: getObjectID('item122B'),
        label: 'Umsetzer',
        image: getObjectID('image122B'),
      },
      {
        _id: getObjectID('item122C'),
        label: 'Koordinator',
        image: getObjectID('image122C'),
      },
      {
        _id: getObjectID('item122D'),
        label: 'Mitspieler',
        image: getObjectID('image122D'),
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
  {
    user: getObjectID('user2'),
    survey: getObjectID('survey2'),
    _id: getObjectID('question3'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    type: 'LIKE',
    items: [
      {
        _id: getObjectID('item11A'),
        label: 'Objekt 1',
        image: getObjectID('image6'),
      },
      {
        _id: getObjectID('item11B'),
        label: 'Objekt 2',
        image: getObjectID('image5'),
      },
    ],
    value: 'Gefällt Ihnen dieses Bild?',
    description: 'Bitte zeigen Sie mit einem "Like", ob Ihnen dieses Bild gefällt.',
    likeIcon: getObjectID('image1.2'),
  },
  {
    user: getObjectID('user2'),
    survey: getObjectID('survey2'),
    _id: getObjectID('question6'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    type: 'LIKEDISLIKE',
    items: [
      {
        _id: getObjectID('item11A'),
        label: 'Objekt 1',
        image: getObjectID('image6'),
      },
      {
        _id: getObjectID('item11B'),
        label: 'Objekt 2',
        image: getObjectID('image5'),
      },
    ],
    value: 'Gefällt Ihnen dieses Bild?',
    description: 'Bitte zeigen Sie mit einem "Like" oder "Dislike", ob Ihnen dieses Bild gefällt oder nicht.',
    likeIcon: getObjectID('image1.3'),
    dislikeIcon: getObjectID('image2'),
  },
  {
    user: getObjectID('user2'),
    survey: getObjectID('survey2'),
    _id: getObjectID('question7'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    type: 'LIKEDISLIKE',
    items: [
      {
        _id: getObjectID('item11A'),
        label: 'Objekt 1',
        image: getObjectID('image6'),
      },
      {
        _id: getObjectID('item11B'),
        label: 'Objekt 2',
        image: getObjectID('image5'),
      },

      {
        _id: getObjectID('item11C'),
        label: 'Objekt 2',
        image: getObjectID('image12'),
      },
    ],
    value: 'Gefällt Ihnen dieses Objekt?',
    description: 'Bitte zeigen Sie mit einem "Like" oder "Dislike", ob Ihnen dieses Objekt gefällt oder nicht.',
    likeIcon: getObjectID('image1.4'),
    dislikeIcon: getObjectID('image2.1'),
  },
  {
    user: getObjectID('user2'),
    survey: getObjectID('survey2'),
    _id: getObjectID('question8'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    type: 'LIKEDISLIKE',
    items: [
      {
        _id: getObjectID('item11A'),
        label: 'Objekt 1',
        image: getObjectID('image6'),
      },
      {
        _id: getObjectID('item11B'),
        label: 'Objekt 2',
        image: getObjectID('image5'),
      },
    ],
    value: 'Gefällt Ihnen dieses Model?',
    description: 'Bitte zeigen Sie mit einem "Like" oder "Dislike", ob Ihnen dieses Model gefällt oder nicht.',
    likeIcon: getObjectID('image1.5'),
    dislikeIcon: getObjectID('image2.2'),
  },
  {
    user: getObjectID('user2'),
    survey: getObjectID('survey2'),
    _id: getObjectID('question9'),
    creationDate: new Date(),
    lastUpdate: new Date(),
    type: 'RANKING',
    value: 'Ordnen Sie diese Elemente nach ihrem persönlichen Wert.',
    description: null,
    items: [
      {
        _id: getObjectID('item9A'),
        label: 'Objekt 1',
        image: getObjectID('image5.3'),
      },
      {
        _id: getObjectID('item9B'),
        label: 'Objekt 2',
        image: getObjectID('image6.3'),
      },
      {
        _id: getObjectID('item9C'),
        label: 'Objekt 3',
        image: getObjectID('image10'),
      },

      {
        _id: getObjectID('item9D'),
        label: 'Objekt 4',
        image: getObjectID('image11'),
      },
    ],
  },
]

module.exports = question
