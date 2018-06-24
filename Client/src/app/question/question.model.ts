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
    	answer{
    		question{
          id
        }
  		}
  	}
}`;


export interface CreateLinkMutationResponse {
  createAnswer: any;
}