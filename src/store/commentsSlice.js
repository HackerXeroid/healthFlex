import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = JSON.parse(localStorage.getItem("comments")) || [];

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      const newComment = {
        id: uuidv4(),
        userName: action.payload.userName,
        text: action.payload.text,
        createdAt: new Date().toISOString(),
        parentId: action.payload.parentId || null,
        subComments: [],
      };

      if (action.payload.parentId) {
        const updateSubComments = (comments) => {
          for (let comment of comments) {
            if (comment.id === action.payload.parentId) {
              comment.subComments.push(newComment);
              return true;
            }
            if (
              comment.subComments.length &&
              updateSubComments(comment.subComments)
            ) {
              return true;
            }
          }
          return false;
        };
        updateSubComments(state);
      } else {
        state.push(newComment);
      }
      localStorage.setItem("comments", JSON.stringify(state));
    },
    editComment: (state, action) => {
      const updateComment = (comments) => {
        for (let comment of comments) {
          if (comment.id === action.payload.id) {
            comment.text = action.payload.text;
            return true;
          }
          if (
            comment.subComments.length &&
            updateComment(comment.subComments)
          ) {
            return true;
          }
        }
        return false;
      };
      updateComment(state);
      localStorage.setItem("comments", JSON.stringify(state));
    },
    deleteComment: (state, action) => {
      const deleteFromComments = (comments) => {
        const index = comments.findIndex(
          (comment) => comment.id === action.payload
        );
        if (index !== -1) {
          comments.splice(index, 1);
          return true;
        }
        for (let comment of comments) {
          if (
            comment.subComments.length &&
            deleteFromComments(comment.subComments)
          ) {
            return true;
          }
        }
        return false;
      };
      deleteFromComments(state);
      localStorage.setItem("comments", JSON.stringify(state));
    },
    sortComments: (state, action) => {
      const { value, order } = action.payload;
      state.sort((a, b) => {
        if (order === "asc") {
          return new Date(a[value]) - new Date(b[value]);
        } else {
          return new Date(b[value]) - new Date(a[value]);
        }
      });
      localStorage.setItem("comments", JSON.stringify(state));
    },
  },
});

export const { addComment, editComment, deleteComment, sortComments } =
  commentsSlice.actions;
export default commentsSlice.reducer;
