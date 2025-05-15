import { gql } from "@apollo/client";
import client from "./apolloClient";

// Lấy danh sách tất cả bài học (hoặc theo course)
const GET_LESSONS = gql`
  query GetLessons($courseId: ID) {
    lessons(courseId: $courseId) {
      id
      title
      content
      status
      courseId
    }
  }
`;

// Lấy chi tiết 1 bài học
const GET_LESSON_BY_ID = gql`
  query GetLessonById($id: ID!) {
    lesson(id: $id) {
      id
      title
      content
      status
      courseId
    }
  }
`;

// Tạo bài học mới
const CREATE_LESSON = gql`
  mutation CreateLesson($input: CreateLessonInput!) {
    createLesson(input: $input) {
      id
      title
      courseId
    }
  }
`;

// Cập nhật bài học
const UPDATE_LESSON = gql`
  mutation UpdateLesson($id: ID!, $input: UpdateLessonInput!) {
    updateLesson(id: $id, input: $input) {
      id
      title
      content
    }
  }
`;

// Xoá bài học
const DELETE_LESSON = gql`
  mutation DeleteLesson($id: ID!) {
    deleteLesson(id: $id) {
      success
      message
    }
  }
`;

// Lấy danh sách bài học (có thể truyền courseId nếu cần)
export const getLessons = async (courseId = null) => {
  try {
    const response = await client.query({
      query: GET_LESSONS,
      variables: courseId ? { courseId } : {},
      fetchPolicy: "no-cache",
    });
    return response.data.lessons;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw error;
  }
};

// Lấy 1 bài học chi tiết
export const getLessonById = async (id) => {
  try {
    const response = await client.query({
      query: GET_LESSON_BY_ID,
      variables: { id },
      fetchPolicy: "no-cache",
    });
    return response.data.lesson;
  } catch (error) {
    console.error("Error fetching lesson:", error);
    throw error;
  }
};

// Tạo bài học
export const createLesson = async (input) => {
  try {
    const response = await client.mutate({
      mutation: CREATE_LESSON,
      variables: { input },
    });
    return response.data.createLesson;
  } catch (error) {
    console.error("Error creating lesson:", error);
    throw error;
  }
};

// Cập nhật bài học
export const updateLesson = async (id, input) => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_LESSON,
      variables: { id, input },
    });
    return response.data.updateLesson;
  } catch (error) {
    console.error("Error updating lesson:", error);
    throw error;
  }
};

// Xoá bài học
export const deleteLesson = async (id) => {
  try {
    const response = await client.mutate({
      mutation: DELETE_LESSON,
      variables: { id },
    });
    return response.data.deleteLesson;
  } catch (error) {
    console.error("Error deleting lesson:", error);
    throw error;
  }
};
