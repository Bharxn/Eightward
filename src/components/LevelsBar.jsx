import { NavLink } from "react-router-dom";

function LevelsBar() {
  return(
    <nav className="mode">
      <div className="easy">
        <NavLink to="/levels/easy">Easy</NavLink>
      </div>
      <div className="medium">
        <NavLink to="/levels/medium">Medium</NavLink>
      </div>
      <div className="hard">
        <NavLink to="/levels/hard">Hard</NavLink>
      </div>
    </nav>
  );
}
export default LevelsBar;