import { gql } from "@apollo/client";
import client from "./apolloClient";

// Lấy floor theo ID
const GET_FLOOR_BY_ID = gql`
  query GetFloorById($id: ID!) {
    getFloorById(id: $id) {
      id
      name
      description
      order
      towerId
      miniGameId
    }
  }
`;

// Lấy danh sách floor theo tower
const GET_FLOORS_BY_TOWER = gql`
  query GetFloorsByTower($towerId: ID!) {
    getFloorsByTower(towerId: $towerId) {
      id
      name
      order
    }
  }
`;

// Lấy danh sách floor theo minigame
const GET_FLOORS_BY_MINIGAME = gql`
  query GetFloorsByMiniGame($miniGameId: ID!) {
    getFloorsByMiniGame(miniGameId: $miniGameId) {
      id
      name
      order
    }
  }
`;

// Tạo mới floor
const CREATE_FLOOR = gql`
  mutation CreateFloor($input: CreateFloorInput!) {
    createFloor(input: $input) {
      success
      message
      data {
        id
        name
        description
        order
        towerId
        miniGameId
      }
    }
  }
`;

// Cập nhật floor
const UPDATE_FLOOR = gql`
  mutation UpdateFloor($input: UpdateFloorInput!) {
    updateFloor(input: $input) {
      success
      message
      data {
        id
        name
        description
        order
        towerId
        miniGameId
      }
    }
  }
`;

// Xóa floor
const DELETE_FLOOR = gql`
  mutation DeleteFloor($input: DeleteFloorInput!) {
    deleteFloor(input: $input) {
      success
      message
    }
  }
`;

// ===== FUNCTIONS =====

export const getFloorById = async (id) => {
  const { data } = await client.query({
    query: GET_FLOOR_BY_ID,
    variables: { id },
    fetchPolicy: "no-cache",
  });
  return data.getFloorById;
};

export const getFloorsByTower = async (towerId) => {
  const { data } = await client.query({
    query: GET_FLOORS_BY_TOWER,
    variables: { towerId },
    fetchPolicy: "no-cache",
  });
  return data.getFloorsByTower;
};

export const getFloorsByMiniGame = async (miniGameId) => {
  const { data } = await client.query({
    query: GET_FLOORS_BY_MINIGAME,
    variables: { miniGameId },
    fetchPolicy: "no-cache",
  });
  return data.getFloorsByMiniGame;
};

export const createFloor = async (input) => {
  const { data } = await client.mutate({
    mutation: CREATE_FLOOR,
    variables: { input },
  });
  return data.createFloor;
};

export const updateFloor = async (input) => {
  const { data } = await client.mutate({
    mutation: UPDATE_FLOOR,
    variables: { input },
  });
  return data.updateFloor;
};

export const deleteFloor = async (id) => {
  const { data } = await client.mutate({
    mutation: DELETE_FLOOR,
    variables: { input: { id } },
  });
  return data.deleteFloor;
};
