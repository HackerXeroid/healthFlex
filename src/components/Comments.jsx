import React from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import SortBy from "./SortBy";

const Comments = () => {
  const comments = useSelector((state) => state.comments);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <SortBy />
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
