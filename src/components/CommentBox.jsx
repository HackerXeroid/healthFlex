import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Textarea, Button } from "@nextui-org/react";
import { addComment, editComment } from "../store/commentsSlice";

const CommentBox = ({ useCase, parent, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (useCase !== "edit" && !name.trim()) return;

    if (useCase === "edit") {
      console.log("Worked");
      dispatch(editComment({ id: parent?.id ?? null, text }));
    } else {
      dispatch(
        addComment({ userName: name, text, parentId: parent?.id ?? null })
      );
    }
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-50/20 rounded-xl flex-col flex gap-3 p-4"
    >
      <p className="font-bold text-lg capitalize">{useCase}</p>
      <Input
        isDisabled={useCase === "edit"}
        label="Name"
        value={useCase === "edit" ? parent.userName : name}
        onChange={(e) => setName(e.target.value)}
        required={useCase !== "edit"}
        autoFocus={useCase === "reply"}
      />
      <Textarea
        label="Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus={useCase === "edit"}
        required
      />
      <div className="flex justify-between">
        <Button type="submit">Post</Button>
        {useCase !== "comment" && (
          <Button type="button" onClick={onClose}>
            Close
          </Button>
        )}
      </div>
    </form>
  );
};

export default CommentBox;
