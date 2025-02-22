
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex items-center justify-center gap-2 mb-2">
      <span className="text-2xl font-bold">
        OVERTIME<span className="text-purple-600">STAFF</span>
      </span>
    </Link>
  );
}
