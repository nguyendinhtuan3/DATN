import { gql } from "@apollo/client";
import client from "./apolloClient";

// ===================== ❓ QUERIES =====================

// Lấy danh sách câu hỏi theo lessonId hoặc quizId
const GET_QUESTIONS = gql`
  query GetQuestions($lessonId: ID) {
    questions(lessonId: $lessonId) {
      id
      questionText
      options {
        text
        isCorrect
      }
      explanation
      type
      lessonId
    }
  }
`;

// Lấy chi tiết 1 câu hỏi
const GET_QUESTION_BY_ID = gql`
  query GetQuestionById($id: ID!) {
    question(id: $id) {
      id
      questionText
      options {
        text
        isCorrect
      }
      explanation
      type
      lessonId
    }
  }
`;

// ===================== ✏️ MUTATIONS =====================

// Tạo câu hỏi mới
const CREATE_QUESTION = gql`
  mutation CreateQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
      questionText
    }
  }
`;

// Cập nhật câu hỏi
const UPDATE_QUESTION = gql`
  mutation UpdateQuestion($id: ID!, $input: UpdateQuestionInput!) {
    updateQuestion(id: $id, input: $input) {
      id
      questionText
    }
  }
`;

// Xoá câu hỏi
const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: ID!) {
    deleteQuestion(id: $id) {
      success
      message
    }
  }
`;

// ===================== 🔥 ACTIONS =====================

// Lấy danh sách câu hỏi
export const getQuestions = async (lessonId) => {
  try {
    const response = await client.query({
      query: GET_QUESTIONS,
      variables: { lessonId },
      fetchPolicy: "no-cache",
    });
    return response.data.questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

// Lấy chi tiết câu hỏi
export const getQuestionById = async (id) => {
  try {
    const response = await client.query({
      query: GET_QUESTION_BY_ID,
      variables: { id },
      fetchPolicy: "no-cache",
    });
    return response.data.question;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
};

// Tạo câu hỏi mới
export const createQuestion = async (input) => {
  try {
    const response = await client.mutate({
      mutation: CREATE_QUESTION,
      variables: { input },
    });
    return response.data.createQuestion;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

// Cập nhật câu hỏi
export const updateQuestion = async (id, input) => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_QUESTION,
      variables: { id, input },
    });
    return response.data.updateQuestion;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

// Xoá câu hỏi
export const deleteQuestion = async (id) => {
  try {
    const response = await client.mutate({
      mutation: DELETE_QUESTION,
      variables: { id },
    });
    return response.data.deleteQuestion;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};
