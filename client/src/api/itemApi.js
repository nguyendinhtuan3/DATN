import { gql } from "@apollo/client";
import client from "./apolloClient";

// =================== 📦 ITEM QUERIES ===================

// Lấy danh sách tất cả vật phẩm
const GET_ITEMS = gql`
  query GetItems {
    items {
      id
      name
      description
      icon
      type
      value
    }
  }
`;

// Lấy chi tiết 1 vật phẩm
const GET_ITEM_BY_ID = gql`
  query GetItemById($id: ID!) {
    item(id: $id) {
      id
      name
      description
      icon
      type
      value
    }
  }
`;

// =================== ✏️ ITEM MUTATIONS ===================

// Tạo vật phẩm mới
const CREATE_ITEM = gql`
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      id
      name
      description
    }
  }
`;

// Cập nhật vật phẩm
const UPDATE_ITEM = gql`
  mutation UpdateItem($id: ID!, $input: UpdateItemInput!) {
    updateItem(id: $id, input: $input) {
      id
      name
      description
    }
  }
`;

// Xoá vật phẩm
const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      success
      message
    }
  }
`;

// =================== 🔥 ACTIONS ===================

// Lấy tất cả vật phẩm
export const getItems = async () => {
  try {
    const response = await client.query({ query: GET_ITEMS });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

// Lấy chi tiết 1 vật phẩm
export const getItemById = async (id) => {
  try {
    const response = await client.query({
      query: GET_ITEM_BY_ID,
      variables: { id },
    });
    return response.data.item;
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    throw error;
  }
};

// Tạo mới vật phẩm
export const createItem = async (input) => {
  try {
    const response = await client.mutate({
      mutation: CREATE_ITEM,
      variables: { input },
    });
    return response.data.createItem;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

// Cập nhật vật phẩm
export const updateItem = async (id, input) => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_ITEM,
      variables: { id, input },
    });
    return response.data.updateItem;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

// Xoá vật phẩm
export const deleteItem = async (id) => {
  try {
    const response = await client.mutate({
      mutation: DELETE_ITEM,
      variables: { id },
    });
    return response.data.deleteItem;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
