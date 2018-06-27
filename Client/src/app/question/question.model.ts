import gql from 'graphql-tag';
export const favoriteAnswerMutate = gql`
mutation($contextID: ID!, $deviceID: ID!, $questionID: ID!, $favoriteImage: ID!){
  createAnswer(data: {
    contextID: $contextID,
    deviceID: $deviceID,
    questionID: $questionID,
    favoriteImage: $favoriteImage
  	}){
      __typename
    	answer{
        __typename
    		question
      }
  	}
}`;