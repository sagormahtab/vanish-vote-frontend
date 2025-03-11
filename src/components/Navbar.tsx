import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            VanishVote
          </Link>
          <Link to="/create" className="btn btn-primary">
            Create Poll
          </Link>
        </div>
      </div>
    </nav>
  );
}
