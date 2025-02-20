import React from "react";
import CommentForm from "./CommentForm";

const CommentItem = ({
  comment,
  handleReply,
  showFormReply,
  handleAddComment,
  setShowFormReply,
  replyTo,
}) => {
  return (
    <div
      className={`flex flex-col p-4 mb-4 border border-gray-200 rounded-lg ${
        comment.parentId ? "ml-10 border-l-4 border-gray-300" : ""
      }`}
    >
      <div className="flex items-start">
        <img
          src={comment.avatar}
          alt={comment.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">{comment.name}</h3>
            <button
              onClick={() => handleReply(comment.id)}
              className="underline text-gray-400 text-sm italic hover:text-gray-900"
            >
              Trả lời
            </button>
          </div>
          <p className="text-left text-gray-600 text-sm mt-1">
            {comment.comment}
          </p>
          <p className="text-left text-gray-400 text-xs mt-1 italic">
            {comment.date}
          </p>
        </div>
      </div>

      {showFormReply === comment.id && (
        <CommentForm
          onSubmit={handleAddComment}
          onCancel={() => setShowFormReply(null)}
          replyTo={replyTo}
        />
      )}
    </div>
  );
};

export default CommentItem;
