import gql from 'graphql-tag';
import { Survey, Query } from '../types'

export const CurrentProjectQuery: any = gql`
  query CurrentProjectForController {
    survey {
      id
      name
      description
    }
  }
`;