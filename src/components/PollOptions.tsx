import { Option } from "../types";

interface Props {
  options: Option[];
  onVote: (optionId: string) => void;
  hasVoted: boolean;
  hideResults: boolean;
  isExpired: boolean;
  totalVotes: number;
}

export default function PollOptions({
  options,
  onVote,
  hasVoted,
  hideResults,
  isExpired,
  totalVotes,
}: Props) {
  const showResults = !hideResults || isExpired || hasVoted;

  return (
    <div className="space-y-3">
      {options.map((option) => {
        const percentage = totalVotes ? (option.votes / totalVotes) * 100 : 0;

        return (
          <button
            key={option.id}
            onClick={() => !hasVoted && onVote(option.id)}
            disabled={hasVoted || isExpired}
            className={`w-full p-4 rounded-lg border transition-all ${
              hasVoted
                ? "cursor-default"
                : "hover:border-primary-500 cursor-pointer"
            }`}
          >
            <div className="flex justify-between mb-1">
              <span>{option.text}</span>
              {showResults && (
                <span className="text-gray-500">
                  {option.votes} votes ({percentage.toFixed(1)}%)
                </span>
              )}
            </div>
            {showResults && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary-600 h-2.5 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
