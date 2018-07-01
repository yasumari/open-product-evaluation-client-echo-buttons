import gql from 'graphql-tag';

export const updateDevice: any = gql`
mutation updateDeviceMutation ($deviceID: ID!, $name: String, $context: ID!, $owners: [ID!]){
  updateDevice(data: 
    {
      name: $name
      context: $context
      owners: $owners
    }, deviceID: $deviceID){
    device {
      name
      id
      creationDate
    }
    }
  }`;

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
}`;