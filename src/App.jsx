import React from "react";
import CommentBox from "./components/CommentBox";
import Comments from "./components/Comments";

function App() {
  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto pt-16 pb-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add a Comment</h2>
          <CommentBox useCase="comment" />
        </div>
        <Comments />
      </main>
    </div>
  );
}

export default App;
