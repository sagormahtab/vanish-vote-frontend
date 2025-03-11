import { useState } from "react";
import { Link } from "react-router-dom";
import { pollsApi } from "../api";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [expiresIn, setExpiresIn] = useState(1);
  const [hideResults, setHideResults] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [createdPollId, setCreatedPollId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const poll = await pollsApi.create({
        question,
        options: options.filter((opt) => opt.trim()),
        expiresIn,
        hideResults,
        isPrivate,
      });
      setCreatedPollId(poll.id);
    } catch (error) {
      console.error("Failed to create poll:", error);
    }
  };

  const handleCopyUrl = () => {
    if (createdPollId) {
      const url = `${window.location.origin}/poll/${createdPollId}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (createdPollId) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Poll Created Successfully!</h1>
        <div className="flex items-center justify-center gap-4">
          <Link to={`/poll/${createdPollId}`} className="btn btn-primary">
            View Poll
          </Link>
          <button
            onClick={handleCopyUrl}
            className="btn btn-secondary relative"
          >
            {copied ? "Copied!" : "Copy Poll URL"}
            {copied && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-green-600 whitespace-nowrap">
                Link copied to clipboard!
              </span>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a New Poll</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="input"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options
          </label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="input mb-2"
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="btn btn-secondary mt-2"
          >
            Add Option
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expires In
          </label>
          <select
            value={expiresIn}
            onChange={(e) => setExpiresIn(Number(e.target.value))}
            className="input"
          >
            <option value={1}>1 hour</option>
            <option value={12}>12 hours</option>
            <option value={24}>24 hours</option>
          </select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hideResults"
              checked={hideResults}
              onChange={(e) => setHideResults(e.target.checked)}
              className="h-4 w-4 text-primary-600"
            />
            <label htmlFor="hideResults" className="ml-2">
              Hide results until poll ends
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPrivate"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="h-4 w-4 text-primary-600"
            />
            <label htmlFor="isPrivate" className="ml-2">
              Make poll private (only accessible via link)
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Create Poll
        </button>
      </form>
    </div>
  );
}
