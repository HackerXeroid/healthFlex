import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../store/commentsSlice";
import CommentBox from "./CommentBox";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const [useCase, setUseCase] = useState(null);

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
  };

  const avatarUrl = `https://api.dicebear.com/6.x/avataaars/svg?seed=${comment.userName}`;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
      <div className="px-6 py-4">
        <div className="flex items-center mb-2">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <div className="font-bold text-xl text-gray-800">
              {comment.userName}
            </div>
            <div className="text-sm text-gray-600">
              {new Date(comment.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <p className="text-gray-700 text-base mt-2">{comment.text}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          onClick={() => setUseCase("reply")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full text-sm mr-2"
        >
          Reply
        </button>
        <button
          onClick={() => setUseCase("edit")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-full text-sm mr-2"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full text-sm"
        >
          Delete
        </button>
      </div>
      {useCase && (
        <div className="px-6 py-4 bg-gray-100">
          <CommentBox
            useCase={useCase}
            parent={comment}
            onClose={() => setUseCase(null)}
          />
        </div>
      )}
      {comment.subComments.map((subComment) => (
        <div key={subComment.id} className="ml-8 mt-4">
          <Comment comment={subComment} />
        </div>
      ))}
    </div>
  );
};

export default Comment;
