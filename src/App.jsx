import React from "react";
import CommentBox from "./components/CommentBox";
import Comments from "./components/Comments";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Comment System</h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add a Comment</h2>
          <CommentBox useCase="comment" />
        </div>
        <Comments />
      </main>
    </div>
  );
}

export default App;
