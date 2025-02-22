
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="text-xl font-bold">
        OVERTIME<span className="text-purple-600">STAFF</span>
      </span>
    </Link>
  );
}
