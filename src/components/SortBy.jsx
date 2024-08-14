import React from "react";
import { useDispatch } from "react-redux";
import { sortComments } from "../store/commentsSlice";

const SortBy = () => {
  const dispatch = useDispatch();

  const handleSort = (e) => {
    const [value, order] = e.target.value.split("-");
    dispatch(sortComments({ value, order }));
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="sort"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Sort Comments
      </label>
      <select
        id="sort"
        onChange={handleSort}
        className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="createdAt-desc">Newest First</option>
        <option value="createdAt-asc">Oldest First</option>
      </select>
    </div>
  );
};

export default SortBy;
