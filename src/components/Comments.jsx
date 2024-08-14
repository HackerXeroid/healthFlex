import React from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import SortBy from "./SortBy";

const Comments = () => {
  const comments = useSelector((state) => state.comments);

  return (
    <div className="w-full mx-auto py-6">
      <SortBy />
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
