import { gql } from "@apollo/client";
import client from "./apolloClient";

// Query to fetch a land by ID
const GET_LAND_BY_ID = gql`
  query GetLandById($id: ID!) {
    land(id: $id) {
      id
      name
      description
      status
      fertility
      quality
      price
    }
  }
`;

// Query to fetch all lands by garden ID
const GET_LANDS_BY_GARDEN = gql`
  query GetLandsByGarden($gardenId: ID!) {
    landsByGarden(gardenId: $gardenId) {
      id
      name
      description
      status
      fertility
      quality
      price
    }
  }
`;

// Mutation to create a new land
const CREATE_LAND = gql`
  mutation CreateLand($input: LandInput!) {
    createLand(input: $input) {
      success
      message
      data {
        id
        name
        description
        status
        fertility
        quality
        price
      }
    }
  }
`;

// Mutation to update a land
const UPDATE_LAND = gql`
  mutation UpdateLand($id: ID!, $input: LandInput!) {
    updateLand(id: $id, input: $input) {
      success
      message
      data {
        id
        name
        description
        status
        fertility
        quality
        price
      }
    }
  }
`;

// Mutation to delete a land
const DELETE_LAND = gql`
  mutation DeleteLand($id: ID!) {
    deleteLand(id: $id) {
      success
      message
    }
  }
`;

// Fetch land by ID
export const getLandById = async (id) => {
  try {
    const response = await client.query({
      query: GET_LAND_BY_ID,
      variables: { id },
    });
    return response.data.land;
  } catch (error) {
    console.error("Error fetching land by ID:", error);
    throw error;
  }
};

// Fetch lands by garden ID
export const getLandsByGarden = async (gardenId) => {
  try {
    const response = await client.query({
      query: GET_LANDS_BY_GARDEN,
      variables: { gardenId },
    });
    return response.data.landsByGarden;
  } catch (error) {
    console.error("Error fetching lands by garden ID:", error);
    throw error;
  }
};

// Create a new land
export const createLand = async (input) => {
  try {
    const response = await client.mutate({
      mutation: CREATE_LAND,
      variables: { input },
    });
    return response.data.createLand;
  } catch (error) {
    console.error("Error creating land:", error);
    throw error;
  }
};

// Update a land
export const updateLand = async (id, input) => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_LAND,
      variables: { id, input },
    });
    return response.data.updateLand;
  } catch (error) {
    console.error("Error updating land:", error);
    throw error;
  }
};

// Delete a land
export const deleteLand = async (id) => {
  try {
    const response = await client.mutate({
      mutation: DELETE_LAND,
      variables: { id },
    });
    return response.data.deleteLand;
  } catch (error) {
    console.error("Error deleting land:", error);
    throw error;
  }
};
