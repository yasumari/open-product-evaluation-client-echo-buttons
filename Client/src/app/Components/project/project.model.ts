import gql from 'graphql-tag';

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
      questions{
        id
        value
        items{
          label
          image{
            id
            url
          }
        }
        type
        description
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
}`;*/





export const CurrentProjectSubscription: any = gql`
query gContexts {
  context(contextID: "7df600774ceaa14488143c9d7877fd71662f4750c7c1c77aede7aa684d7c16f1") {
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
            label
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
