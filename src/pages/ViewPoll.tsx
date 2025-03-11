import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Poll } from "../types";
import { pollsApi, commentsApi } from "../api";
import PollOptions from "../components/PollOptions";
import PollReactions from "../components/PollReactions";
import Comments from "../components/Comments";
import dayjs from "dayjs";

export default function ViewPoll() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    loadPoll();
  }, [id]);

  const loadPoll = async () => {
    try {
      const data = await pollsApi.get(id!);
      setPoll(data);
    } catch (err) {
      setError("Failed to load poll");
      console.error(err);
    }
  };

  const handleVote = async (optionId: string) => {
    try {
      await pollsApi.vote(id!, optionId);
      setHasVoted(true);
      loadPoll();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReact = async (type: "trending" | "like") => {
    try {
      await pollsApi.react(id!, type);
      loadPoll();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (content: string) => {
    try {
      await commentsApi.create(id!, content);
      loadPoll();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Go Home
        </button>
      </div>
    );
  }

  if (!poll) {
    return <div>Loading...</div>;
  }

  const isExpired = new Date() > new Date(poll.expiresAt);
  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold">{poll.question}</h1>
          <button
            onClick={handleCopyLink}
            className="btn btn-secondary relative"
          >
            {copied ? "Copied!" : "Copy Link"}
            {copied && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-green-600 whitespace-nowrap">
                Link copied to clipboard!
              </span>
            )}
          </button>
        </div>
        <p className="text-gray-600">
          Expires {dayjs(poll.expiresAt).fromNow()}
        </p>
      </div>

      <PollOptions
        options={poll.options}
        onVote={handleVote}
        hasVoted={hasVoted}
        hideResults={poll.hideResults}
        isExpired={isExpired}
        totalVotes={totalVotes}
      />

      <PollReactions reactions={poll.reactions} onReact={handleReact} />

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <Comments comments={poll.comments} onAddComment={handleAddComment} />
      </div>
    </div>
  );
}
