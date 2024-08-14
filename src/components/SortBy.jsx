import React from "react";
import { useDispatch } from "react-redux";
import { sortComments } from "../store/commentsSlice";
import { Select, SelectItem } from "@nextui-org/react";

const SortBy = () => {
  const dispatch = useDispatch();

  const handleSort = (e) => {
    const key = e.target.value;
    const [value, order] = key.split("-");
    dispatch(sortComments({ value, order }));
  };

  return (
    <div className="flex justify-end">
      <Select
        label="Sort Comments"
        onChange={handleSort}
        defaultSelectedKeys={["createdAt-desc"]}
        className="max-w-52 dark mb-4"
      >
        <SelectItem key="createdAt-desc" value="createdAt-desc">
          Newest First
        </SelectItem>
        <SelectItem key="createdAt-asc" value="createdAt-asc">
          Oldest First
        </SelectItem>
      </Select>
    </div>
  );
};

export default SortBy;
