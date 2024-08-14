import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { deleteComment } from "../store/commentsSlice";
import CommentBox from "./CommentBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Avatar, button } from "@nextui-org/react";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const [useCase, setUseCase] = useState(null);
  const paragraphContainerRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const deleteButtonRef = useRef(null);

  useEffect(() => {
    if (
      paragraphContainerRef.current &&
      buttonContainerRef.current &&
      deleteButtonRef.current
    ) {
      const topStyle = Math.round(
        (paragraphContainerRef.current.offsetHeight +
          buttonContainerRef.current.offsetHeight) /
          2
      );

      deleteButtonRef.current.style.top = `${topStyle}px`;
    }
  }, [comment.text]);

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
  };

  const avatarUrl = `https://api.dicebear.com/6.x/avataaars/svg?seed=${comment.id}`;
  const dateStr = comment.createdAt;
  const date = parseISO(dateStr);

  // Format the date to "2nd Aug 2020"
  const formattedDate = format(date, "do MMM yyyy", {
    locale: enUS,
  });

  console.log(comment);

  return (
    <div
      className={`border-y border-l relative ${
        !comment.parentId && "border-r"
      } rounded-r-none border-gray-50/20 shadow-lg rounded-lg mb-6`}
    >
      <div className="flex">
        <div ref={paragraphContainerRef} className="px-6 py-4 w-full">
          <div className="flex items-center mb-4">
            <Avatar isBordered src={avatarUrl} className="mr-4" />
            <div>
              <div className="font-bold text-lg">{comment.userName}</div>
            </div>
            <p className="ml-auto text-default-500">{formattedDate}</p>
          </div>
          <p className="text-default-500 text-base mt-2">{comment.text}</p>
        </div>
      </div>
      <div ref={buttonContainerRef} className="px-6 pt-4 pb-2 text-default-400">
        <button
          onClick={() => setUseCase("reply")}
          className="font-bold py-1 px-2 rounded-full text-sm mr-2"
        >
          Reply
        </button>
        <button
          onClick={() => setUseCase("edit")}
          className="font-bold py-1 px-2 rounded-full text-sm mr-2"
        >
          Edit
        </button>
        <button
          ref={deleteButtonRef}
          onClick={handleDelete}
          className={`font-bold py-1 px-2 border rounded-full text-sm absolute right-0
          translate-x-1/2 -translate-y-1/3 bg-background`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      {useCase && (
        <div className="px-6 py-4">
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
