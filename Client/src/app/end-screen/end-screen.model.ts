import gql from 'graphql-tag';


export const updateDevice: any = gql`
mutation updateDeviceMutation ($deviceID: ID!, $context: ID){
  updateDevice(data: 
    {
      context: $context
    }, deviceID: $deviceID){
    device {
      name
      id
      context{
        id
      }
    }
    }
  }`;