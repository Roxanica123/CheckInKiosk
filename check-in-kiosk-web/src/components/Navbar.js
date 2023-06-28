import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/index">Students</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;