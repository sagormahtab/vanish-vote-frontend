import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Poll } from "../types";
import { pollsApi } from "../api";
import dayjs from "dayjs";

export default function Home() {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls = async () => {
    try {
      const data = await pollsApi.getAll();
      // Sort by trending and likes
      const sortedPolls = data.sort((a: Poll, b: Poll) => {
        if (b.reactions.trending !== a.reactions.trending) {
          return b.reactions.trending - a.reactions.trending;
        }
        return b.reactions.like - a.reactions.like;
      });
      setPolls(sortedPolls);
    } catch (error) {
      console.error("Failed to load polls:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Create Anonymous Polls that Vanish
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Create polls that automatically expire, keeping your votes private and
          temporary.
        </p>
        <Link to="/create" className="btn btn-primary text-lg">
          Create Your Poll
        </Link>
      </div>

      <div className="grid gap-6 mt-12">
        {polls.map((poll) => (
          <Link
            key={poll.id}
            to={`/poll/${poll.id}`}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{poll.question}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>🔥 {poll.reactions.trending}</span>
              <span>👍 {poll.reactions.like}</span>
              <span>Expires {dayjs(poll.expiresAt).fromNow()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
