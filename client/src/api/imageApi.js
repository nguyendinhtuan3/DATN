import { gql } from "@apollo/client";
import client from "./apolloClient";

const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!, $itemId: ID, $landId: ID, $userId: ID) {
    uploadImage(
      file: $file
      itemId: $itemId
      landId: $landId
      userId: $userId
    ) {
      id
      url
      itemId
      landId
      userId
    }
  }
`;

export const uploadImage = async (file, itemId, landId, userId) => {
  try {
    const { data } = await client.mutate({
      mutation: UPLOAD_IMAGE,
      variables: { file, itemId, landId, userId },
    });
    return data.uploadImage; // Image object returned from the server
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};
