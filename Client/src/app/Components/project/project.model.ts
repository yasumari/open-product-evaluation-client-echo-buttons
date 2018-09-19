import gql from 'graphql-tag';

/**
 * @description Server: alle KontextIDs abfragen
 */
export const queryContextID: any = gql`
query{
  contexts{
    id
  }
}
`;

/**
 * @description Server: ein neues Device anlegen
 */
export const newDeviceMutation: any = gql`
mutation addNewDevice ($deviceName: String!){
	createDevice(data: {
  	name: $deviceName
  }){
    device{
      id
      name
      creationDate
    }
    token
  } 
}`;

/**
 * @description Server: ein Device mit der KontextID aktualisieren
 */
export const updateDevice: any = gql`
mutation updateDeviceMutation ($deviceID: ID!, $context: ID!){
  updateDevice(data: 
    {
      context: $context
    }, deviceID: $deviceID){
    device {
      name
      id
      creationDate
    }
    }
  }`;

/**
 * @description Server: Query: das Projekt mittels der KontextID abfragen
 */
export const currentProjectData: any = gql`
query gContexts ($contextID: ID!){
  context(contextID: $contextID) {
    id
    name
    activeSurvey {
      id
      description
      title
      types
      questions {
        id
        description
        value
        items {
          image {
            url
            id
          }
          label
        }
        ... on LikeQuestion {
          likeIcon {
            id
            url
          }
        }
        ... on LikeDislikeQuestion {
          likeIcon {
            id
            url
          }
          dislikeIcon {
            id
            url
          }
        }
        ... on ChoiceQuestion {
          choices {
            id
            image {
              url
            }
            label
            code
          }
        }
        ... on RegulatorQuestion {
          labels {
            image {
              url
            }
            value
          }
          default
          max
          min
          stepSize
        }
        items {
          id
          image {
            url
          }
          label
        }
      }
      votes{
        answers{
          question
          __typename
          ...on LikeDislikeAnswer{
            liked
          }
          ...on LikeAnswer{
            liked
          }
          ...on ChoiceAnswer{
            choice
          }
          ...on RegulatorAnswer{
            rating
            normalized
          }
          ...on RankingAnswer{
            rankedItems
          }
          ...on FavoriteAnswer{
            favoriteItem
          }
        }
      }
    }
  }
}`;


