/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      given_name
      family_name
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        given_name
        family_name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAppointments = /* GraphQL */ `
  query GetAppointments($id: ID!) {
    getAppointments(id: $id) {
      id
      patient
      doctor
      date
      reason
      notes
      approval
      createdAt
      updatedAt
    }
  }
`;
export const listAppointments = /* GraphQL */ `
  query ListAppointments(
    $filter: ModelAppointmentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAppointments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        patient
        doctor
        date
        reason
        notes
        approval
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
