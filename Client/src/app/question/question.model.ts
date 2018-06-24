import gql from 'graphql-tag';
export const CurrentAnswerMutate = gql`
mutation($contextID: ID!, $deviceID: ID!, $questionID: ID!, $itemCode: String!, $choiceCode: String!){
  createAnswer(data: {
    contextID: $contextID,
    deviceID: $deviceID,
    questionID: $questionID,
    itemCode: $itemCode,
    choiceCode: $choiceCode
  	}){
      __typename
    	answer{
        __typename
    		question{
          id
          __typename
        }
      }
  	}
}`;

export interface CreateLinkMutationResponse {
  createAnswer: any;
}