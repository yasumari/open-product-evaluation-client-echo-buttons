import gql from 'graphql-tag';
export const CurrentProjectQuery: any = gql`
fragment itemsPart on Item{
  image{
          url
          data{
            id
            creationDate
          }
        }
}

query CurrentProjectForController ($contextID: ID!){
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
      	data{
          id
          creationDate
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