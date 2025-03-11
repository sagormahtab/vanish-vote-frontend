import React, { useState } from "react";
import { Comment } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface Props {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

export default function Comments({ comments, onAddComment }: Props) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAddComment(content);
      setContent("");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          className="input min-h-[100px]"
        />
        <button type="submit" className="btn btn-primary">
          Post Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-800">{comment.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              {dayjs(comment.createdAt).fromNow()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
