import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = JSON.parse(localStorage.getItem("comments")) || [
  {
    id: "a1b2c3d4-e5f6-7g8h-9i10-jk11lm12n13o",
    userName: "Alice",
    text: "This is the main comment on the post.",
    createdAt: "2024-08-14T12:34:56.789Z",
    parentId: null,
    subComments: [
      {
        id: "p1q2r3s4-t5u6-v7w8-x9y0-z1a2b3c4d5e6",
        userName: "Bob",
        text: "This is a reply to the main comment.",
        createdAt: "2024-08-14T13:45:01.234Z",
        parentId: "a1b2c3d4-e5f6-7g8h-9i10-jk11lm12n13o",
        subComments: [
          {
            id: "f1g2h3i4-j5k6-l7m8-n9o0-p1q2r3s4t5u6",
            userName: "Charlie",
            text: "This is a nested reply to Bob's comment.",
            createdAt: "2024-08-14T14:56:07.890Z",
            parentId: "p1q2r3s4-t5u6-v7w8-x9y0-z1a2b3c4d5e6",
            subComments: [],
          },
        ],
      },
      {
        id: "g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2",
        userName: "Diana",
        text: "This is another reply to the main comment.",
        createdAt: "2024-08-14T15:12:34.567Z",
        parentId: "a1b2c3d4-e5f6-7g8h-9i10-jk11lm12n13o",
        subComments: [
          {
            id: "w3x4y5z6-a7b8-c9d0-e1f2-g3h4i5j6k7l8",
            userName: "Eve",
            text: "This is a nested reply to Diana's comment.",
            createdAt: "2024-08-14T16:23:45.678Z",
            parentId: "g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2",
            subComments: [],
          },
        ],
      },
    ],
  },
];

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
              comment.subComments.unshift(newComment);
              return true;
            }
            if (updateSubComments(comment.subComments)) {
              return true;
            }
          }
          return false;
        };
        updateSubComments(state);
      } else {
        state.unshift(newComment);
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
      if (value === "createdAt") {
        state.sort((a, b) => {
          if (order === "asc") {
            return new Date(a[value]) - new Date(b[value]);
          } else {
            return new Date(b[value]) - new Date(a[value]);
          }
        });

        localStorage.setItem("comments", JSON.stringify(state));
      }
    },
  },
});

export const { addComment, editComment, deleteComment, sortComments } =
  commentsSlice.actions;
export default commentsSlice.reducer;
