import { gql } from "@apollo/client";
import client from "./apolloClient";

// Lấy câu trả lời theo ID
const GET_ANSWER_BY_ID = gql`
  query GetAnswerById($id: ID!) {
    getAnswerById(id: $id) {
      id
      label
      answer
      isCorrect
      explanation
      order
      questionId
    }
  }
`;

// Lấy tất cả câu trả lời của một câu hỏi
const GET_ANSWERS_BY_QUESTION = gql`
  query GetAnswersByQuestion($questionId: ID!) {
    getAnswersByQuestion(questionId: $questionId) {
      id
      label
      answer
      isCorrect
      explanation
      order
    }
  }
`;

// Tạo mới câu trả lời
const CREATE_ANSWER = gql`
  mutation CreateAnswer($input: CreateAnswerInput!) {
    createAnswer(input: $input) {
      success
      message
      data {
        id
        label
        answer
        isCorrect
        explanation
        order
        questionId
      }
    }
  }
`;

// Cập nhật câu trả lời
const UPDATE_ANSWER = gql`
  mutation UpdateAnswer($id: ID!, $input: UpdateAnswerInput!) {
    updateAnswer(id: $id, input: $input) {
      success
      message
      data {
        id
        label
        answer
        isCorrect
        explanation
        order
        questionId
      }
    }
  }
`;

// Xóa câu trả lời
const DELETE_ANSWER = gql`
  mutation DeleteAnswer($id: ID!) {
    deleteAnswer(id: $id) {
      success
      message
    }
  }
`;

export const getAnswerById = async (id) => {
  const { data } = await client.query({
    query: GET_ANSWER_BY_ID,
    variables: { id },
    fetchPolicy: "no-cache",
  });
  return data.getAnswerById;
};

export const getAnswersByQuestion = async (questionId) => {
  const { data } = await client.query({
    query: GET_ANSWERS_BY_QUESTION,
    variables: { questionId },
    fetchPolicy: "no-cache",
  });
  return data.getAnswersByQuestion;
};

export const createAnswer = async (input) => {
  const { data } = await client.mutate({
    mutation: CREATE_ANSWER,
    variables: { input },
  });
  return data.createAnswer;
};

export const updateAnswer = async (id, input) => {
  const { data } = await client.mutate({
    mutation: UPDATE_ANSWER,
    variables: { id, input },
  });
  return data.updateAnswer;
};

export const deleteAnswer = async (id) => {
  const { data } = await client.mutate({
    mutation: DELETE_ANSWER,
    variables: { id },
  });
  return data.deleteAnswer;
};
