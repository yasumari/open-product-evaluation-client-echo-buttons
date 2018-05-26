import gql from 'graphql-tag';
import { Survey, Query, Question, Owner, Images } from '../types';

export const CurrentProjectQuery: any = gql`
  query CurrentProjectForController ($id: Int){
    survey (id: $id){
      id,
      name,
      description,
      owner{
          firstname, 
          lastname,
          email},
      questions{
          _id,
          sequence,
          value,
          description
      }
    }
  }
`;