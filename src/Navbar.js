// import logo from "./logo.png";
import { Link } from "react-router-dom";
import logo from "./favicon.ico";

const Navbar = () => {
	return (
		<div className="nav">
			<div>
				<Link to="/">
					<img src={logo} alt="Logo" />
					<h1>Prospectus</h1>
				</Link>{" "}
			</div>
		</div>
	);
};

export default Navbar;
