import gql from 'graphql-tag';
import { Survey, Query, Question, Owner, Images } from '../types';

export const CurrentProjectQuery: any = gql`
query CurrentProjectForController ($surveyid: ID!){
  survey(surveyID: $surveyid){
    id,
    title,
    description,
    creator{
        firstName, 
        lastName,
        email},
    questions{
        id,
        value,
        description
    }
  }
}`;