import gql from 'graphql-tag';


export const queryContextID: any = gql`
query{
  contexts{
    id
  }
}
`;
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
/* Subscription geht noch nicht 
export const CurrentProjectSubscription: any = gql`
fragment itemsPart on Item{
  image{
          url
         id
        }
}

subscription CurrentProjectForController ($contextID: ID!){
  context(contextID: $contextID){
    name
    id
    lastUpdate
    creationDate 
    activeQuestion{
      id
      description
      value
      type
      __typename
      items{
        ...itemsPart
      }
    }
    activeSurvey{
      id
      title
      description
      isPublic
      creator{
        firstName
        lastName
      }
      images{
        url
      	id
      }
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
            name
            hash
            tags
          }
        }
        ... on LikeDislikeQuestion {
          likeIcon {
            id
            url
            name
            hash
            tags
          }
          dislikeIcon {
            id
            url
            name
            hash
            tags
          }
        }
        ... on ChoiceQuestion {
          choices {
            image {
              url
            }
            label
            code
          }
          defaultChoice: default
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
          image {
            url
          }
          label
        }
      }
      votes{
        id
        creationDate
        answers{
          question
          __typename
          ...on RegulatorAnswer{
            question
            rating
            normalized
          } 
        }
      }
    }
    owners{
      firstName
      lastName
    }
    devices{
      id
    }
    states{
      key
      value
    }
  }
}`;
*/


export const CurrentProjectSubscription: any = gql`
query gContexts ($contextID: ID!){
  context(contextID: $contextID) {
    owners{id}
    id
    name
    activeSurvey {
      description
      title
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
            name
            hash
            tags
          }
        }
        ... on LikeDislikeQuestion {
          likeIcon {
            id
            url
            name
            hash
            tags
          }
          dislikeIcon {
            id
            url
            name
            hash
            tags
          }
        }
        ... on ChoiceQuestion {
          choices {
            image {
              url
            }
            label
            code
          }
          defaultChoice: default
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
            choiceCode
          }
          ...on RegulatorAnswer{
            rating
            normalized
          }
          ...on RankingAnswer{
            rankedImages
          }
        }
      }
    }
    activeQuestion {
      id
    }
    states {
      key
      value
    }
  }
}`;





/*
          ...on LikeDislikeAnswer{
            liked
          }
          ...on LikeAnswer{
            liked
          }
          ...on ChoiceAnswer{
            choiceCode
          }
          ...on RegulatorAnswer{
            rating
            normalized
          }
          ...on RankingAnswer{
            rankedImages
          }
*/


//TODO oder Subscription Votes
/*
subscription{
  votes(surveyID: 123){
  id
    creationDate
    context
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
            choiceCode
          }
          ...on RegulatorAnswer{
            rating
            normalized
          }
          ...on RankingAnswer{
            rankedImages
          }
        }
  }
}*/