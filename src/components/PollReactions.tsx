import { FireIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { Reaction } from "../types";

interface Props {
  reactions: Reaction;
  onReact: (type: "trending" | "like") => void;
}

export default function PollReactions({ reactions, onReact }: Props) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onReact("trending")}
        className="flex items-center gap-2 text-gray-600 hover:text-primary-600"
      >
        <FireIcon className="h-5 w-5" />
        <span>{reactions.trending}</span>
      </button>
      <button
        onClick={() => onReact("like")}
        className="flex items-center gap-2 text-gray-600 hover:text-primary-600"
      >
        <HandThumbUpIcon className="h-5 w-5" />
        <span>{reactions.like}</span>
      </button>
    </div>
  );
}
