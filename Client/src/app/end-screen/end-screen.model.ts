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

  export const deleteDevice: any = gql`
  mutation deleteDeviceMutation ($deviceID: ID!){
    deleteDevice(deviceID: $deviceID){
      device{
        id
        name
      }
    }
  }`;
