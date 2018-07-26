import gql from 'graphql-tag';
export const favoriteAnswerMutate = gql`
mutation($questionID: ID!, $favoriteImage: ID!){
  createAnswer(data: {
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
