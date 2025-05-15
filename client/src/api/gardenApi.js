import { gql } from "@apollo/client";
import client from "./apolloClient";

// Query to fetch a garden by user ID
const GET_GARDEN_BY_USER = gql`
  query GetGardenByUser($userId: ID!) {
    garden(userId: $userId) {
      id
      name
      description
      lands {
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

// Query to fetch all gardens (admin purpose)
const GET_ALL_GARDENS = gql`
  query GetAllGardens {
    allGardens {
      id
      name
      description
      lands {
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

// Mutation to create a new garden
const CREATE_GARDEN = gql`
  mutation CreateGarden($input: GardenInput!) {
    createGarden(input: $input) {
      success
      message
      data {
        id
        name
        description
        lands {
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
  }
`;

// Mutation to update a garden
const UPDATE_GARDEN = gql`
  mutation UpdateGarden($userId: ID!, $input: GardenInput!) {
    updateGarden(userId: $userId, input: $input) {
      success
      message
      data {
        id
        name
        description
        lands {
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
  }
`;

// Mutation to delete a garden
const DELETE_GARDEN = gql`
  mutation DeleteGarden($id: ID!) {
    deleteGarden(id: $id) {
      success
      message
    }
  }
`;

// Fetch garden by user ID
export const getGardenByUser = async (userId) => {
  try {
    const response = await client.query({
      query: GET_GARDEN_BY_USER,
      variables: { userId },
    });
    return response.data.garden;
  } catch (error) {
    console.error("Error fetching garden by user:", error);
    throw error;
  }
};

// Fetch all gardens
export const getAllGardens = async () => {
  try {
    const response = await client.query({
      query: GET_ALL_GARDENS,
    });
    return response.data.allGardens;
  } catch (error) {
    console.error("Error fetching all gardens:", error);
    throw error;
  }
};

// Create a new garden
export const createGarden = async (input) => {
  try {
    const response = await client.mutate({
      mutation: CREATE_GARDEN,
      variables: { input },
    });
    return response.data.createGarden;
  } catch (error) {
    console.error("Error creating garden:", error);
    throw error;
  }
};

// Update a garden
export const updateGarden = async (userId, input) => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_GARDEN,
      variables: { userId, input },
    });
    return response.data.updateGarden;
  } catch (error) {
    console.error("Error updating garden:", error);
    throw error;
  }
};

// Delete a garden
export const deleteGarden = async (id) => {
  try {
    const response = await client.mutate({
      mutation: DELETE_GARDEN,
      variables: { id },
    });
    return response.data.deleteGarden;
  } catch (error) {
    console.error("Error deleting garden:", error);
    throw error;
  }
};
