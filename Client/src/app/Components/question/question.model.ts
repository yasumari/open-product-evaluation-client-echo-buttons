import gql from 'graphql-tag';

//FavoriteQuesion
export const favoriteAnswerMutate = gql`
mutation($questionID: ID!, $favoriteImage: ID!, $deviceID: ID!, $contextID: ID!){
  createAnswer(data: {
    questionID: $questionID,
    deviceID: $deviceID, 
    contextID: $contextID
    favoriteImage: $favoriteImage
  	}){
      __typename
    	answer{
        __typename
    		question
      }
  	}
}`;

//LikeDislikeQuestion
export const likeDislikeAnswerMutate = gql`
mutation($questionID: ID!, $liked: ID!, $deviceID: ID!, $contextID: ID!){
  createAnswer(data: {
    questionID: $questionID,
    deviceID: $deviceID, 
    contextID: $contextID,
    liked: $liked
  	}){
      __typename
    	answer{
        __typename
    		question
      }
  	}
}`;

//LikeQuestion
export const likeAnswerMutate = gql`
mutation($questionID: ID!, $liked: boolean, $deviceID: ID!, $contextID: ID!){
  createAnswer(data: {
    questionID: $questionID,
    deviceID: $deviceID, 
    contextID: $contextID,
    liked: $liked
  	}){
      __typename
    	answer{
        __typename
    		question
      }
  	}
}`;

//RegulatorQuestion
export const regulatorAnswerMutate = gql`
mutation($questionID: ID!, $rating: Float, $normalized: Float, $deviceID: ID!, $contextID: ID!){
  createAnswer(data: {
    questionID: $questionID,
    deviceID: $deviceID, 
    contextID: $contextID,
    normalized: $normalized, 
    rating: $rating 
  	}){
      __typename
    	answer{
        __typename
    		question
      }
  	}
}`;

//ChoiceQuestion
export const choiceAnswerMutate = gql`
mutation($questionID: ID!, $choiceCode: string, $deviceID: ID!, $contextID: ID!){
  createAnswer(data: {
    questionID: $questionID,
    deviceID: $deviceID, 
    contextID: $contextID,
    choiceCode: $choiceCode
  	}){
      __typename
    	answer{
        __typename
    		question
      }
  	}
}`;

//RankingQuestion
export const rankingAnswerMutate = gql`
mutation($questionID: ID!, $deviceID: ID!, $contextID: ID!, $rating: Float){
  createAnswer(data: {
     questionID: $questionID,
     deviceID: $deviceID,
     contextID: $contextID,
     rating: $rating
     }){
       __typename
       answer{
         __typename
         question
       }
     }
 }`;